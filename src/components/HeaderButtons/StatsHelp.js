import React from 'react';

const StatsHelp = ({url}) => {
    return (
        <div>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <button className="modal-btn">Stats Dictionary</button>
            </a>
        </div>
    );
}

export default StatsHelp;