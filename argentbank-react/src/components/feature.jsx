import React from 'react';
import '../styles/index.css';

function Feature({image, title, description}) {
    return (
        <div className="feature-item">
            <img
                src={ image }
                alt="Chat Icon"
                className="feature-icon"
            />
            <h3 className="feature-item-title">{ title }</h3>
            <p>{ description }</p>
        </div>
    )
}

export default Feature

