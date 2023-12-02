import React from 'react';
import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/argentBankLogo.webp';
import '../styles/index.css';

function Header() {
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to="./sign-in" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign in
                </Link>
            </div>
        </nav>
    );
}

export default Header;

