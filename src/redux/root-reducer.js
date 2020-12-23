import {combineReducers} from "redux";
import userReducer from "./user/user-reducer";
import transactionReducer from "./transaction/transaction-reducer";
import courseReducer from "./course/course-reducer";
import collegeReducer from "./college/college-reducer";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "./cart/cart-reducer";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    courses: courseReducer,
    college: collegeReducer,
    transaction: transactionReducer,
    cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);