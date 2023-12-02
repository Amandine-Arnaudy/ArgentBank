import '../styles/index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { userLogIn } from '../redux/user.reducer'
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


function Form() {

    // états locaux pour stocker email, mdp, remember me
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false);

    // redux pour obtenir le statut de la connexion et erreur
    const status = useSelector((state) => state.user.status)
    const error = useSelector((state) => state.user.error)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // Redirection vers la page utilisateur si la connexion est réussie
        if (status === 'success') {
          navigate('/user');
        }
      }, [status, navigate]);

    return (
        <form id="logIn">
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            {status === 'error' &&
                <div className="errorMessage" id="errorText">{error}</div>
            }
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>

            <button
                className="sign-in-button"
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(userLogIn({ email, password, rememberMe }));
                }}
            >
                Sign In
            </button>

        </ form>
    )
}

export default Form
