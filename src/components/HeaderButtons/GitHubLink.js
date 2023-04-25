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
        </div>
    );
}

export default GitHubLink;
