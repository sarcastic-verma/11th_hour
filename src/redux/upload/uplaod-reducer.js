import UploadTypes from "./upload-types";

const initialState = {
    url: "",
    progress: 0
}

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UploadTypes.UpdateProgress:
            return {
                ...state,
                progress: action.payload
            }
        case UploadTypes.UpdateUrl:
            return {
                ...state,
                url: action.payload
            }
        default:
            return state;
    }
};

export default uploadReducer;