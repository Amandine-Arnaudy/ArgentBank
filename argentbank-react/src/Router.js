import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Footer from "./containers/footer";
import Index from './pages/indexPage'
import SignIn from './pages/signInPage'
import User from './pages/userPage'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Index />}/>
                <Route path='/sign-in' element={<SignIn />}/>
                <Route path='/user' element={<User />}/>
                <Route path="*" element={<Index />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

