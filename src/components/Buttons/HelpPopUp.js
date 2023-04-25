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
                        <p>In sports analytics, there are several basic statistics that are commonly used to evaluate performance in football, basketball, and baseball. In football, common statistics include total yards, yards per carry, and completion percentage. Total yards measure the total distance gained by a team or player, yards per carry measures the average yards gained per rush attempt, and completion percentage measures the percentage of passes completed by a quarterback. In basketball, common statistics include points per game, rebounds per game, and assists per game. Points per game measures the average number of points scored by a player per game, rebounds per game measures the average number of rebounds collected by a player per game, and assists per game measures the average number of assists made by a player per game. In baseball, common statistics include batting average, on-base percentage, and earned run average. Batting average measures the percentage of times a player gets a hit when they bat, on-base percentage measures the percentage of times a player gets on base, and earned run average measures the average number of runs allowed by a pitcher over nine innings. Understanding these basic statistics can help users of the sports analytics application to better evaluate performance and make informed decisions.</p>
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
