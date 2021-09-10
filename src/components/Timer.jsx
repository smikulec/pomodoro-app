import React from 'react';

export default function Timer(props) {
    const { time, mode } = props;

    const min = Math.floor( time / 1000 / 60);
    const sec = Math.floor((time / 1000) % 60);

    return (
        <div className="timer">
            <p id="timer-label">{mode === "session" ? "Time to focus!" : "Break time"}</p>
            <p id="time-left">
                {min}:{sec.toString().length === 1 ? "0" + sec : sec}
            </p>
        </div>
    )
}