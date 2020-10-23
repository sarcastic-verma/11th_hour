import UploadTypes from "./upload-types";


export const UpdateUrl = url => ({
    type: UploadTypes.UpdateUrl,
    payload: url
})

export const UpdateProgress = progress => ({
    type: UploadTypes.UpdateProgress,
    payload: progress
})

