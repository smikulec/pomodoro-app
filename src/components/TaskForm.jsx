import React, { useState } from 'react';

export default function TaskForm({onCreateTask}) {

    const [state, setState] = useState({
        name:""
    })

    const handleChange = (event) => {
        event.preventDefault();

        const name = event.target.name;
        const value = event.target.value;

        setState((state) => ({
            ...state,
            [name]: value
        }));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreateTask(state);
    }

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <label for="task">Enter a task you'd like to work on</label>
            <br />
            <input 
                id="task" 
                name="name" 
                value={state.name} 
                type="text" 
                onChange={handleChange}
                placeholder="Learn React"                
            />
            <button 
                type="submit"
            >
                Enter
            </button>
        </form>
    );
}
