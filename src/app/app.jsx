import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import "./app.scss";

import HomePage from "../views/home/home.view";
import AboutPage from "../views/about/about.view";
import AuthPage from "../views/auth/auth.view";
import UploadPage from "../views/upload/upload.view";


import {createUserProfileDocument} from "../controllers/user-controller";
import {auth} from "../firebase-config/firebase.utils";

import {setCurrentUser} from "../redux/user/user-actions";
import {selectCurrentUser} from "../redux/user/user-selectors";
import Page404 from "../views/page-404/page-404.views";

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot((snapShot) => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>               
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/upload" component={UploadPage}/>
                    <Route exact path="/about" component={AboutPage}/>
                    <Route
                        exact
                        path="/signin"
                        render={() =>
                            this.props.currentUser ? (
                                <Redirect to="/"/>
                            ) : (
                                <AuthPage/>
                            )
                        }
                    />
                    <Route component={Page404}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
