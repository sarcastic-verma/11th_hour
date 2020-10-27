import {storage} from "../firebase-config/firebase.utils";


export const onFileChange = (e, setFile) => {
    for (let i = 0; i < e.target.files.length; i++) {
        const newFile = e.target.files[i];
        newFile["id"] = i;
        console.log(newFile);
        setFile(newFile);
    }
};

export const onUploadSubmission = (e, files, setProgress, setUrl, onComplete) => {
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
        const uploadTask =
            storage.ref().child(`courses/${files[i].name}`).put(files[i]);
        promises.push(uploadTask);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                // inProgressSize += snapshot.bytesTransferred;

                console.log("uploading");
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
                const url = await storage.ref("courses").child(files[i].name).getDownloadURL();
                setUrl(url);
                console.log("Done with " + url + "progress is " + inProgressSize);
            }
        );
    }
    Promise
        .all(promises)
        .then(() => {
            alert('All files uploaded');
            onComplete();
        })
        .catch(err => console.log(err.code));
}
