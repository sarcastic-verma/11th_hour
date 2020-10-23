import {combineReducers} from "redux";
import userReducer from "./user/user-reducer";
import transactionReducer from "./transaction/transaction-reducer";
import courseReducer from "./course/course-reducer";
import collegeReducer from "./college/college-reducer";
import uploadReducer from "./upload/uplaod-reducer";

export default combineReducers({
    user: userReducer,
    course: courseReducer,
    college: collegeReducer,
    transaction: transactionReducer,
    upload: uploadReducer
});