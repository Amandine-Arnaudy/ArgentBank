import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../containers/header';
import HeaderUser from '../containers/headerUser';
import Banner from '../containers/banner';
import Features from '../containers/features';

function App() {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => state.user.status === 'success');

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <>
            {isLoggedIn ? <HeaderUser onLogout={handleLogout} /> : <Header />}
            <Banner />
            <Features />
        </>
    );
}

export default App;
