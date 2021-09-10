import React from 'react';

export default function BreakLength(props) {
    const { increment, decrement, length } = props;

    return (
        <div class="break-container">
            <p id="break-label">Set break time:</p>
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
    )
}