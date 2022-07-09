import React, { useState, useContext } from 'react';
import { AppContext } from '../../pages/_app';

export default function TaskForm() {
	const { dispatch } = useContext(AppContext);

	const [taskInput, setTaskInput] = useState({
		name: '',
	});

	const handleChange = (event) => {
		event.preventDefault();

		const name = event.target.name;
		const value = event.target.value;

		setTaskInput((taskInput) => ({
			...taskInput,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch({ type: 'createTask', payload: taskInput });
	};

	return (
		<>
			<p>What would you like to invest your time in?</p>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<label htmlFor='task'></label>
				<br />
				<input
					id='task'
					name='name'
					value={taskInput.name}
					type='text'
					onChange={handleChange}
					placeholder='Learn React'
				/>
				<button type='submit'>Enter</button>
			</form>
		</>
	);
}
