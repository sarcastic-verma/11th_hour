import firebase, {fieldValue, firestore, storage} from "../firebase-config/firebase.utils";
import Course from "../models/course";


export const onFileChange = (e, title, setFile) => {
    for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = i;
        console.log(newFile);
        setFile(title, newFile);
    }
};

export const addCourseToFirestore = async (title, price, description, subject, courseId, collegeId, instructorId,
                                           instructorName, lectureFiles, resourceFiles, courseThumbnailFile, setProgress, onComplete) => {
    let lectureDetails = [];
    let resourceDetails = [];

    //lecture section
    const lecTotalSize = lectureFiles.reduce(
        (accumalatedQuantity, file) =>
            accumalatedQuantity + file.size,
        0
    );
    let lecInProgressSize = 0;
    const lecPromises = [];
    for (let i = 0; i < lectureFiles.length; i++) {
        let lecUploadTask =
            storage.ref().child(`Courses/${courseId}/Lectures/${lectureFiles[i].name}`).put(lectureFiles[i]);
        lecPromises.push(lecUploadTask);
        lecUploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                // inProgressSize += snapshot.bytesTransferred;
            },
            error => {
                console.log(error);
            },
            async () => {
                lecInProgressSize += lectureFiles[i].size;
                const progress = Math.round(
                    (lecInProgressSize / lecTotalSize) * 100
                );
                setProgress("lectures", progress);
                let folderName = "Lectures";
                const url = await storage.ref(`Courses/${courseId}/${folderName}/`).child(lectureFiles[i].name).getDownloadURL();
                lectureDetails.push({lectureUrl: url, name: lectureFiles[i].name});
                console.log("Done with " + url + "progress is " + lecInProgressSize);
            }
        );
    }
    Promise
        .all(lecPromises)
        .then(() => {
            onComplete('lectures');
            const resTotalSize = resourceFiles.reduce(
                (accumalatedQuantity, file) =>
                    accumalatedQuantity + file.size,
                0
            );
            let resInProgressSize = 0;
            const resPromises = [];
            for (let i = 0; i < resourceFiles.length; i++) {
                let resUploadTask =
                    storage.ref().child(`Courses/${courseId}/Resources/${resourceFiles[i].name}`).put(resourceFiles[i])
                resPromises.push(resUploadTask);
                resUploadTask.on(
                    "state_changed",
                    snapshot => {
                        // progress function ...
                        // inProgressSize += snapshot.bytesTransferred;
                    },
                    error => {
                        console.log(error);
                    },
                    async () => {
                        resInProgressSize += resourceFiles[i].size;
                        const progress = Math.round(
                            (resInProgressSize / resTotalSize) * 100
                        );
                        setProgress('resources', progress);
                        let folderName = "Resources"
                        const url = await storage.ref(`Courses/${courseId}/${folderName}/`).child(resourceFiles[i].name).getDownloadURL();
                        resourceDetails.push({resourceUrl: url, name: resourceFiles[i].name});
                        console.log("Done with " + url + "progress is " + resInProgressSize);
                    }
                );
            }
            Promise
                .all(resPromises)
                .then(() => {
                    onComplete('resources');
                    const courseThumbnailUploadTask = storage.ref(`Courses/${courseId}/thumbnail.jpeg`).put(courseThumbnailFile[0]);
                    courseThumbnailUploadTask.on(
                        "state_changed",
                        snapshot => {
                            const progress = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                            setProgress('course thumbnail', progress);
                        },
                        error => {
                            console.log(error);
                        },
                        async () => {
                            const courseThumbnailUrl = await storage.ref(`Courses/${courseId}`).child('thumbnail.jpeg').getDownloadURL();
                            onComplete('course thumbnail');
                            console.log(`asa ${courseThumbnailUrl}`);
                            const date = firebase.firestore.FieldValue.serverTimestamp();
                            console.log(`lec: ${lectureDetails} ,ct: ${courseThumbnailUrl}`);
                            await firestore.doc(`courses/${courseId}`).set({
                                lectures: lectureDetails,
                                resources: resourceDetails,
                                courseThumbnail: courseThumbnailUrl,
                                title,
                                price,
                                collegeId,
                                description,
                                subject,
                                date,
                                blackListed: false,
                                enrolledUsers: [],
                                instructorId,
                                instructorName,
                                ratings: [],
                            });

                            await firestore.doc(`users/${instructorId}`).update({
                                myUploadedCourses: fieldValue.arrayUnion(...[courseId])
                            });
                            await firestore.doc(`colleges/${collegeId}`).update({
                                ['subjectWithCourses.' + subject]: fieldValue.arrayUnion(...[courseId])
                            });
                            alert('All files uploaded');
                        }
                    );
                })
                .catch(err => console.log(err.code));
        })
        .catch(err => console.log(err.code));

};

export const getCourses = async () => {
    let courses = [];
    let snapshot =
        await firestore.collection("courses").get();
    snapshot.docs.forEach(course => {
        courses.push({['id']: course.id, ...course.data()})
    });
    return courses;
};

export const getCourseById = (courses, courseId) => {
    return courses.find((course) => course.id === courseId);
};

//this is used when a user buys a course
export const addUserToCourses = (userId, courseIds, courses) => {
    for (let i = 0; i < courseIds.length; i++)
        getCourseById(courses, courseIds[i]).enrolledUsers.add(userId);
    return courseIds;
};

export const updateCourseRating = async (courseId, newRating, userId, courses) => {
    let snapshot =
        await firestore.collection("courses").document(courseId).get();

    let ratings = snapshot['ratings'];

    if (ratings == null || ratings.length === 0)
        ratings = [newRating];
    else {
        let isRated = false;
        for (let i = 0; i < ratings.length; i++) {
            if (ratings[i]['userId'] === userId) {
                ratings[i]['userRating'] = newRating['userRating'];
                isRated = true;
                break;
            }
        }
        if (!isRated) {
            ratings.add(newRating);
        }
    }

    await firestore
        .collection("courses")
        .document(courseId)
        .update({"ratings": ratings});

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
            courses[i].ratings = ratings;
            break;
        }
    }
    return courses;
};

export const getTrendingCourses = (courses) => {
    courses.sort((a, b) => {
        return b.enrolledUsers.length >= a.enrolledUsers.length;
    });
    return courses;
};

export const getCoursesByIds = (coursesInState, courseIds) => {
    let courses = [];
    console.log(coursesInState);
    try {
        for (let i = 0; i < courseIds.length; i++) {
            let course = getCourseById(coursesInState, courseIds[i].trim());
            courses.push(course);
        }
    } catch (err) {
        console.log(err);
    }
    return courses;
};