import { Link } from 'react-router-dom';
import argentBankLogo from '../assets/argentBankLogo.png';
import '../styles/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const HeaderUser = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.user.user.userName);
    const navigate = useNavigate();

    const clearToken = (e) => {
        e.preventDefault();
        dispatch({ type: 'LOGOUT' });
        navigate('/sign-in');
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
            <div>
                <Link className="main-nav-item" to="/user">
                    {userName}
                    <i className="fa fa-user-circle"></i>
                </Link>
                <Link className="main-nav-item">
                    <i className="fa-solid fa-gear"></i>
                </Link>
                <Link className="main-nav-item" onClick={clearToken}>
                    <i className="fa-solid fa-power-off"></i>
                </Link>
            </div>
        </nav>
    );
};

export default HeaderUser;