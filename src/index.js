import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/app';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App/>
                </PersistGate>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
