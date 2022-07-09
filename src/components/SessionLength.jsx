import React, { useContext } from 'react';
import { AppContext } from '../../pages/_app';

export default function SessionLength({ type }) {
	const { state, dispatch } = useContext(AppContext);

	return (
		<div className='session-container'>
			{type === 'work' && (
				<>
					<p id='session-label'>Set work time:</p>
					<button
						className='change-button'
						onClick={() => dispatch({ type: 'decrementSessionLength' })}>
						-
					</button>
					<span className='length-span'>{state.sessionLength / 60}</span>
					<button
						className='change-button'
						onClick={() => dispatch({ type: 'incrementSessionLength' })}>
						+
					</button>
				</>
			)}
			{type === 'break' && (
				<>
					<p id='session-label'>Set break time:</p>
					<button
						className='change-button'
						onClick={() => dispatch({ type: 'decrementBreakLength' })}>
						-
					</button>
					<span className='length-span'>{state.breakLength / 60}</span>
					<button
						className='change-button'
						onClick={() => dispatch({ type: 'incrementbreakLength' })}>
						+
					</button>
				</>
			)}

			{/* <p id='session-label'>Set {type === 'work' ? 'work' : 'break'} time:</p>
			<button className='change-button' onClick={decrement}>
				-
			</button>
			<span className='length-span'>{state.sessionLength / 60}</span>
			<button className='change-button' onClick={increment}>
				+
			</button> */}
		</div>
	);
}
