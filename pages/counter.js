import { useContext } from 'react';
import { AppContext } from './_app';
import Timer from '../src/components/Timer';

export default function PomodoroCounter({ timeLeft, mode, reset }) {
	const { state, dispatch } = useContext(AppContext);

	const handleReset = () => {
		dispatch({ type: 'reset' });
		reset();
	};

	return (
		<div>
			<div className='timer-container'>
				<p>{state?.taskName?.name}</p>
				<Timer time={timeLeft} mode={mode} />
				<button
					className='active-button'
					onClick={() => dispatch({ type: 'toggleActiveState' })}>
					{state.isActive ? 'Pause' : 'Start'}
				</button>
				<button className='reset-button' onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
}
