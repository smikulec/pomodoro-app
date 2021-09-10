import React from 'react';

export default function SessionLength(props) {
    const { increment, decrement, length } = props;

    return(
    <div class="session-container">
        <p id="session-label">Set work time:</p>
        <button 
            className="change-button"
            onClick={decrement} 
        >
            -
        </button>
        <span className="length-span">{length / 60}</span>
        <button
            className="change-button" 
            onClick={increment}
        >
            +
        </button>
    </div>
    );
}