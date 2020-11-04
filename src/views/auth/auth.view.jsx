import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import Header from "../../components/header/header.component";

import './auth.styles.scss';

const AuthPage = () => (
    <div>
        <Header/>
        <div className='auth'>
            <SignIn />
            <SignUp />
        </div>
    </div>
    
);

export default AuthPage;
