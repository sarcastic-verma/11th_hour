import {storage} from "../firebase-config/firebase.utils";
import {UpdateProgress, UpdateUrl} from "../redux/upload/upload-actions";
import store from "../redux/store";

const BoundUpdateUrl = url => store.dispatch(UpdateUrl(url));
const BoundUpdateProgress = progress => store.dispatch(UpdateProgress(progress));

export const handleUpload = (image) => {
    const uploadTask = storage.ref(`test/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        snapshot => {
            // progress function ...
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            BoundUpdateProgress(progress);
            console.log("uploaded");
        },
        error => {
            // Error function ...
            console.log(error);
        },
        async () => {
            // complete function ...
            console.log("imagine a loader showing here!!");
            const url = await storage.ref("test").child(image.name).getDownloadURL();
            BoundUpdateUrl(url);
            console.log("Done");
        }
    );
};