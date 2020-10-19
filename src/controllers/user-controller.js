import {firestore} from "../firebase-config/firebase.utils";

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
                email, displayName, createdAt, ...additionalData
            });
        } catch (e) {
            console.log(e.message);
        }
    }
    return userRef;
}