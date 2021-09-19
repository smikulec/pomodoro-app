import React from 'react';

export default function SessionCounter({ sessionCounter, breakCounter }) {
    return (
        <div className="session-counter-container">
            <div>Work sessions: {sessionCounter} </div>
            <div>Breaks: {breakCounter} </div>
        </div>
    )
}