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

export const onUploadSubmission = async (e, files, type, setProgress, onComplete, courseId) => {
    if (type !== 'course thumbnail') {
        let details = [];
        const totalSize = files.reduce(
            (accumalatedQuantity, file) =>
                accumalatedQuantity + file.size,
            0
        );
        console.log(totalSize);
        let inProgressSize = 0;
        e.preventDefault(); // prevent page refreshing
        const promises = [];
        for (let i = 0; i < files.length; i++) {
            let uploadTask;
            type === "lectures" ?
                uploadTask =
                    storage.ref().child(`Courses/${courseId}/Lectures/${files[i].name}`).put(files[i]) :
                uploadTask =
                    storage.ref().child(`Courses/${courseId}/Resources/${files[i].name}`).put(files[i])
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    // progress function ...
                    // inProgressSize += snapshot.bytesTransferred;
                    console.log("ll");
                },
                error => {
                    console.log(error);
                },
                async () => {
                    inProgressSize += files[i].size;
                    const progress = Math.round(
                        (inProgressSize / totalSize) * 100
                    );
                    setProgress(progress);
                    let folderName;
                    type === "lectures" ?
                        folderName =
                            "Lectures" :
                        folderName =
                            "Resources";
                    const url = await storage.ref(`Courses/${courseId}/${folderName}/`).child(files[i].name).getDownloadURL();
                    type === "lectures" ?
                        details.push({lectureUrl: url, name: files[i].name})
                        :
                        details.push({resourceUrl: url, name: files[i].name});
                    console.log("Done with " + url + "progress is " + inProgressSize);
                }
            );
        }
        Promise
            .all(promises)
            .then(() => {
                onComplete();
            })
            .catch(err => console.log(err.code));
        return details;
    } else {
        const uploadTask = storage.ref(`Courses/${courseId}/thumbnail.jpeg`).put(files[0]);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            async () => {
                const url = await storage.ref(`Courses/${courseId}`).child('thumbnail.jpeg').getDownloadURL();
                console.log(`asa ${url}`);
                return url;
            }
        );

    }
}

export const addCourseToFirestore = async (lectures, resources, courseThumbnail, title, price, description, subject, courseId, collegeId, instructorId,
                                           instructorName) => {
    const date = firebase.firestore.FieldValue.serverTimestamp();
    await firestore.doc(`courses/${courseId}`).set({
        lectures,
        resources,
        // courseThumbnail,
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
    alert('All files uploaded');
};

export const getCourses = async () => {
    let courses = [];
    let snapshot =
        await firestore.collection("courses").getDocuments();
    snapshot.documents.forEach((course) => {
        courses.push(Course.fromDocumentSnapshot(course));
    });
    return courses;
};

export const getCourseById = (courses, courseId) => {
    return courses.where((course) => course.id === courseId)[0];
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

export const getCoursesByIds = (courseIds) => {
    let courses = [];
    try {
        for (let i = 0; i < courses.length; i++) {
            let cid = getCourseById(courseIds[i].trim());
            courses.push(cid);
        }
    } catch (err) {
        console.log(err);
    }
    return courses;
};