import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';
import {persistStore} from "redux-persist";

///////////use below line when multiple middlewares req.

// const middlewares = [logger];

////////// and spread it in place of logger at line 8

const store = createStore(rootReducer, applyMiddleware(logger));

export const persistor = persistStore(store);
export default store;