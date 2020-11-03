import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {auth} from '../../firebase-config/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import {selectCurrentUser} from '../../redux/user/user-selectors';

import { ReactComponent as Logo } from '../../assets/home-button.svg';
import './header.styles.scss';
import Searchbar from'../search-bar/search-bar.component';

const Header = ({ currentUser }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Searchbar/>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/upload'>
        Uploads
      </Link>
      <Link className='option' to='/about'>
        About
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
