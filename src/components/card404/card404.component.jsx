import React from "react";
import './card404.styles.scss'
import image404 from "../../assets/404.jpg";
import {ReactComponent as Logo} from '../../assets/white-home.svg';
import {Link} from 'react-router-dom';

const Card404 = () => (
    <div className="error404">
        <img className="img" src={image404} alt=""/>
        <div className="maindiv">
            <Link className='logo-container' to='/'>
                <Logo className="homelogo"/>
            </Link>
            <h1> Hello? Is somebody here?!?</h1> <br/>
            <h2>We know it's scary but the page you're trying to reach can't be found. Perhaps it was a
                bad <strike>link</strike> dream.</h2>
        </div>
    </div>
);

export default Card404;