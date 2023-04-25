import React, { useState } from 'react';

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
                        <h2>Dark Mode</h2>
                        <p>Sorry, this feature is not available at the moment.</p>
                        <button className="border rounded p-2 mb-2" onClick={handlePopupClose}>Close Popup</button>
                    </div>
                </div>
            )}
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

export default DarkMode;
