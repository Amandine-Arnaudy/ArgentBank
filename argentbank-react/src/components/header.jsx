import React from 'react';
import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/argentBankLogo.png';
import '../styles/header.css';

function Header() {
    return (
        <nav className="main-nav">
            <Link to="./index.html" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to="./sign-in.html" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    <Link to="/sign-in">Sign in</Link>
                </Link> 
            </div>
        </nav>
    );
}

export default Header;
