import React, { useState } from 'react';

function GitHubLink() {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
    }

    return (
        <div>
            <a href="https://github.com/Petder02/The-Ronald-Louis" target="_blank" rel="noopener noreferrer">
                <button className="modal-btn" onClick={handleButtonClick}>GitHub</button>
            </a>
            <style jsx>{`
              button.modal-btn {
                background-color: transparent;
                border: none;
                outline: none;
              }
              .popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 0, 0, 0.5);
                width: 100%;
                height: 100%;
                z-index: 9999;
              }
              .popup-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: #fff;
                padding: 20px;
                max-width: 600px;
                max-height: 80%;
                overflow-y: auto;
              }
            `}</style>
        </div>
    );
}

export default GitHubLink;
