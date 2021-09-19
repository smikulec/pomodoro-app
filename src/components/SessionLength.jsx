import React from 'react';

export default function SessionLength({increment, decrement, length, type}) {
    return(
    <div class="session-container">
        <p id="session-label">Set {type === 'work' ? 'work' : 'break'} time:</p>
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