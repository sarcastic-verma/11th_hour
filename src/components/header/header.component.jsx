import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {auth} from '../../firebase-config/firebase.utils';
import {selectCurrentUser} from '../../redux/user/user-selectors';

import {ReactComponent as Logo} from '../../assets/home-button.svg';
import './header.styles.scss';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        {/*<Searchbar/>*/}
        <div className='options'>
            {currentUser ? (
                <Link className='option' to='/upload'>
                    Upload Course
                </Link>
            ) : (
                <div/>
            )}
            {currentUser ? (
                <div className='option' onClick={() => auth.signOut()}>
                    Sign Out
                </div>
            ) : (
                <Link className='option' to='/signin'>
                    Sign In
                </Link>
            )}
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
