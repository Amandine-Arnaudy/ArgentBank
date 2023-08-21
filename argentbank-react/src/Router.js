import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Header from "./components/header";
import Footer from "./components/footer";


function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route />
                <Route />
                <Route />

            </Routes>
            <Footer />
        </div>
    );
}

export default App;