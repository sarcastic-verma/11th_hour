import {storage} from "../firebase-config/firebase.utils";

export const handleUpload = (image) => {
    const uploadTask = storage.ref(`courses/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        snapshot => {
            // progress function ...
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({progress});
        },
        error => {
            // Error function ...
            console.log(error);
        },
        () => {
            // complete function ...
            storage
                .ref("courses")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    this.setState({url});
                });
        }
    );
};