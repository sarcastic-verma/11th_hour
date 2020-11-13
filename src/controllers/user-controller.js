import {auth, fieldValue, firestore, storage} from "../firebase-config/firebase.utils";
import User from "../models/user";
// import User from "../models/course";
// import {fieldValue} from "@firebase/firestore/dist/firestore/src/compat/field_value";

export const kDefaultProfilePicUrl = 'https://firebasestorage.googleapis.com/v0/b/th-hour-de18e.appspot.com/o/userDefault.jpeg?alt=media&token=5323bfb1-3339-460a-8988-6a86a3711f8c';
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth)
        return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
        const {email, displayName} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                email,
                displayName,
                createdAt,
                "myCourses": [],
                "cart": [],
                "recentCoursesIds": [],
                "myUploadedCourses": [],
                "wishlist": [],
                "transactionIds": [],
                ...additionalData,
            });
        } catch (e) {
            console.log(e.message);
        }
    }
    return userRef;
}

export const uploadFile = async (userId, image) => {
    try {
        let uploadTask =
            storage.ref().child('Profile Pictures/$userId.png').put(image);
        await uploadTask.onComplete;
        return await storage
            .ref()
            .child('Profile Pictures/$userId.png')
            .getDownloadURL();
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const updateProfilePicture = async (
    userId, oldImageURL, newImage) => {
    try {
        if (oldImageURL !== kDefaultProfilePicUrl) {
            let photoRef =
                await storage.ref(oldImageURL);
            await photoRef.delete();
        }

        let newFileURL = await uploadFile(userId, newImage);
        await firestore.collection("users").document(userId).update({
            'profilePicURL': newFileURL,
        });

        return newFileURL;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const removeProfilePicture = async (
    userId, oldImageURL) => {
    try {
        if (oldImageURL !== kDefaultProfilePicUrl) {
            let photoRef =
                await storage.ref(oldImageURL);
            await photoRef.delete();

            await firestore.collection("users").document(userId).update({
                'profilePicURL': kDefaultProfilePicUrl,
            });
        }
        return kDefaultProfilePicUrl;
    } catch (e) {
        console.log()
        return null;
    }
}

export const addToWishlist = async (userId, courseId) => {
    await firestore.collection("users").document(userId).update({
        'wishlist': fieldValue.arrayUnion([courseId]),
    });
}

export const addToRecentCourses = async (
    userId, courseId) => {
    await firestore.collection("users").document(userId).update({
        'recentCoursesIds': fieldValue.arrayUnion([courseId]),
    });
}

export const handlePaymentSuccess = async (userId, courseIds) => {
    await firestore.collection("users").document(userId).update(
        {'myCourses': fieldValue.arrayUnion(courseIds), 'cart': []});

    for (let i = 0; i < courseIds.length; i++) {
        await firestore.collection("courses").document(courseIds[i]).update({
            'enrolledUsers': fieldValue.arrayUnion([userId]),
        });
    }
}

export const addToCart = async (userId, courseId) => {
    await firestore.collection("users").document(userId).update({
        'cart': fieldValue.arrayUnion([courseId]),
    });
}

export const updateCollege = async (userId, collegeId) => {
    await firestore.collection("users").document(userId).update({
        'collegeId': collegeId,
    });
}

export const removeFromWishlist = async (
    userId, courseId) => {
    await firestore.collection("users").document(userId).update({
        'wishlist': fieldValue.arrayRemove([courseId]),
    });
}

export const removeFromCart = async (userId, courseId) => {
    await firestore.collection("users").document(userId).update({
        'cart': fieldValue.arrayRemove([courseId]),
    });
}

export const getUser = async (userId) => {
    let snapshot =
        await firestore.collection("users").document(userId).get();
    return User.fromDocumentSnapshot(snapshot);
}

export const changeCurrentUserPassword = async (
    oldPassword, newPassword) => {
    let user = await getCurrentUser();

    let credential = auth.EmailAuthProvider.credential(user.email, oldPassword);
    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);
    return true;
}

export const changeCurrentUserEmail = async (
    oldPassword, newEmail) => {
    let user = await getCurrentUser();
    let credential = auth.EmailAuthProvider.credential(user.email, oldPassword);
    await user.reauthenticateWithCredential(credential);

    await user.updateEmail(newEmail);
    await user.sendEmailVerification();
    return true;
}

export const updateNameAndPhone = async (
    userId, name, phone) => {
    await firestore.collection("users").document(userId).update({
        'name': name,
        'phone': phone,
    });
    return true;
}

export const getCurrentUser = async () => {
    try {
        let currentUser = await auth.currentUser;
        if (currentUser != null && currentUser.emailVerified)
            return currentUser;
        else
            return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const sendPasswordResetEmail = async (email) => {
    try {
        await auth.sendPasswordResetEmail(email);
        return true;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const resendEmailVerificationLink = async (email, password) => {
    try {
        let user = await auth.signInWithEmailAndPassword(email, password);
        if (user != null) {
            await user.user.sendEmailVerification();
            return true;
        } else
            return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const registerUser = async (
    name, profilePicURL, collegeId, phone, email, password
) => {
    try {
        let user = await auth.createUserWithEmailAndPassword(email, password);

        await user.user.sendEmailVerification();

        if (user !== null) {
            firestore.collection("users").document(user.user.uid).setData({
                "name": name,
                "phone": phone,
                "collegeId": collegeId,
                "profilePicURL": profilePicURL,
                "email": email,
                "myCourses": [],
                "cart": [],
                "recentCoursesIds": [],
                "myUploadedCourses": [],
                "wishlist": [],
                "transactionIds": [],
            });
            return user.user.uid;
        } else
            return null;
    } catch (e) {
        console.log(e);
    }
}

export const updatePersonalDetails = async (
    name, updatedProfileUrl, uid, collegeId, phone, email) => {
    try {
        await firestore.collection('users').document(uid).update({
            'name': name,
            'profileURL': updatedProfileUrl,
            'collegeId': collegeId,
            'phone': phone,
            'email': email
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}