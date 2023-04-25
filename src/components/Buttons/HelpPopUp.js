import React, { useState } from 'react';

function HelpPopUp() {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
    }

    return (
        <div>
            <button className="modal-btn" onClick={handleButtonClick}>Help</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Help</h2>
                        <p>Welcome to the Sportanalyse-Anwendung! If you encounter any issues where a feature displays a loading sign for more than a minute, simply reload the page and enter in your data again. On the home page, you will see three icons representing the three sports: football, basketball, and baseball. Click on any of the icons to navigate to the respective page for each sport. On the sports page, you can filter results in a table by typing in the player/team name or statistical value in the proper column. You can download and display this data by selecting the players/teams you want to include in the graph using the checkboxes and generating a .csv file, which you can upload to the application. Once you have uploaded your data, select how you'd like to view it by choosing from the available graphs and customizing it to your preferences. Finally, you can export the graph you've created by editing the file name and selecting the file type. Please note that the option 'Turbo discreet' crashes the application.</p>
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

export default HelpPopUp;
