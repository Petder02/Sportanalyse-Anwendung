import React, { useState } from 'react';
import "./index.css";

// Incomplete
function DarkMode() {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
    }

    return (
        <div>
            <button className="modal-btn" onClick={handleButtonClick}>Dark Mode</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2><b>Dark Mode</b></h2>
                        <p>Unfortunately, this feature is not available at the moment.</p>
                        <button className="border rounded p-2 mb-2 popup-close-btn" onClick={handlePopupClose}>Close Popup</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DarkMode;
