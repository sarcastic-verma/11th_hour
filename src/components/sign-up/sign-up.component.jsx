import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth} from '../../firebase-config/firebase.utils';

import './sign-up.styles.scss';
import {createUserProfileDocument} from "../../controllers/user-controller";

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            phone: '',
            collegeId: '',
            profilePicURL: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword, phone, collegeId, profilePicURL} = this.state;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, {
                displayName, phone,
                collegeId,
                profilePicURL
            });

            this.setState({
                displayName: '',
                phone: '',
                collegeId: '',
                profilePicURL: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    };

    render() {
        const {displayName, email, password, confirmPassword,phone,profilePicURL,collegeId} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span className = "span">Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='text'
                        name='phone'
                        value={phone}
                        onChange={this.handleChange}
                        label='Phone Number'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;
