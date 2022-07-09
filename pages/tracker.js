import { useContext } from 'react';
import { AppContext } from './_app';
import SessionCounter from '../src/components/SessionCounter';

export default function ProductivityTracker() {
	const { state } = useContext(AppContext);

	return (
		<div>
			<h1>How is your productivity doing today?</h1>
			<SessionCounter
				sessionCounter={state.sessionCounter}
				breakCounter={state.breakCounter}
			/>
		</div>
	);
}
