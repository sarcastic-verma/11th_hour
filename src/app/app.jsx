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
import ProfilePage from "../views/profile-page/profile-page.view";
import MyUploads from "../views/my-uploads/my-uploads.view";
import {setAllCourses} from "../redux/course/course-actions";
import {getCourses} from "../controllers/course-controller";

class App extends React.Component {
    unsubscribeFromAuth = null;

    async componentDidMount() {
        const {setCurrentUser,setAllCourses} = this.props;

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

        const courses = await getCourses();
        setAllCourses(courses);
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/upload" render={() =>
                        this.props.currentUser ? (
                            <UploadPage/>
                        ) : (
                            <AuthPage/>
                        )
                    }/>
                    <Route exact path="/my-uploads" render={() =>
                        this.props.currentUser ? (
                            <MyUploads/>
                        ) : (
                            <AuthPage/>
                        )
                    }/>
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
                    <Route
                        exact
                        path="/profile"
                        render={() =>
                            this.props.currentUser ? (
                                <ProfilePage/>
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
    setAllCourses: (courses) => dispatch(setAllCourses(courses))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
