import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/argentBankLogo.webp';
import '../styles/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const HeaderUser = () => {

    const dispatch = useDispatch();

    // hook pour obtenir le surnom depuis le store
    const userName = useSelector((state) => state.user.user.userName);
    const navigate = useNavigate();

    // fonction pour déconnecter l'utilisateur
    const clearToken = (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className='div-main'>
                <Link className="main-nav-item" to="/user">
                    {userName}
                    <i className="fa fa-user-circle"></i>
                </Link>
                <Link className="main-nav-item">
                    <i className="fa-solid fa-gear"></i>
                </Link>
                <Link className="main-nav-item" onClick={clearToken} to="/">
                    <i className="fa-solid fa-power-off"></i>
                </Link>
            </div>
        </nav>
    );
};

export default HeaderUser;

