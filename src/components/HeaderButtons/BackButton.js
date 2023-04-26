import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
    const redirectToHomePage = () => {
        navigate("/");
    }

    return (
        <div>
            <button className="modal-btn" onClick={redirectToHomePage}>Back to Home Page</button>
        </div>
    );
}

export default BackButton;