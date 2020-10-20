import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

///////////use below line when multiple middlewares req.

// const middlewares = [logger];

////////// and spread it in place of logger at line 8

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;