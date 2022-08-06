import { useEffect, useState, useReducer, createContext } from 'react';
import {
	incrementLength,
	decrementLength,
} from '../src/containers/LengthCalculatorContainer';
import Link from 'next/link';
import '../src/App.css';

const taskDetailsReducer = (state, action) => {
	switch (action.type) {
		case 'incrementSessionLength': {
			return {
				...state,
				sessionLength: incrementLength(state?.sessionLength),
			};
		}
		case 'decrementSessionLength': {
			return {
				...state,
				sessionLength: decrementLength(state?.sessionLength),
			};
		}
		case 'incrementBreakLength': {
			return {
				...state,
				breakLength: incrementLength(state?.breakLength),
			};
		}
		case 'decrementBreakLength': {
			return {
				...state,
				breakLength: decrementLength(state?.breakLength),
			};
		}
		case 'countSessions': {
			return {
				...state,
				sessionCounter: state.sessionCounter + 1,
			};
		}
		case 'countBreaks': {
			return {
				...state,
				breakCounter: state.breakCounter + 1,
			};
		}
		case 'toggleActiveState': {
			return {
				...state,
				isActive: !state.isActive,
			};
		}
		case 'createTask': {
			return {
				...state,
				taskName: action.payload,
			};
		}
		case 'overallTime': {
			return {
				...state,
				overallTime: state.sessionLength * state.sessionCounter,
			};
		}
		case 'reset': {
			return {
				...state,
				sessionLength: 25 * 60,
				breakLength: 5 * 60,
				isActive: false,
			};
		}
		default:
		// do nothing
	}
};

const taskDetailsInitialState = {
	taskName: '',
	overallTime: 0,
	sessionLength: 25 * 60,
	sessionCounter: 0,
	breakLength: 5 * 60,
	breakCounter: 0,
	isActive: false,
};

export const AppContext = createContext();

export default function App({ Component, pageProps }) {
	const [state, dispatch] = useReducer(
		taskDetailsReducer,
		taskDetailsInitialState
	);
	const [taskList, setTaskList] = useState([]);
	const [timeSpent, setTimeSpent] = useState(0);
	const [mode, setMode] = useState('session');

	const timeLeft =
		(mode === 'session' ? state.sessionLength : state.breakLength) * 1000 -
		timeSpent;

	useEffect(() => {
		let interval = null;

		if (state.isActive && timeLeft > 1) {
			interval = setInterval(() => {
				setTimeSpent((timeSpent) => timeSpent + 1000);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		if (timeLeft === 0) {
			setTimeSpent(0);
			setMode((mode) => (mode === 'session' ? 'break' : 'session'));
			mode === 'session' && dispatch({ type: 'countSessions' });
			mode === 'break' && dispatch({ type: 'countBreaks' });
		}

		return () => clearInterval(interval);
	}, [state.isActive, mode, timeSpent, timeLeft]);

	const reset = () => {
		setTimeSpent(0);
	};

	useEffect(() => {
		if (taskList.some((task) => task.taskName.name === state.taskName.name)) {
			return;
		}
		return setTaskList((currentList) => [...currentList, state]);
	}, [state, taskList]);

	const handleTaskSubmit = (task) => {
		setTaskList((currentList) => [...currentList, state]);
	};

	console.log('taskList', taskList);
	console.log(state);

	return (
		<div className='App'>
			<h1>Pomodoro Productivity Tracker</h1>
			<nav className='nav-bar'>
				<ul className='nav-list'>
					<li>
						<Link className='nav-link' href='/settings/'>
							Settings
						</Link>
					</li>
					<li>
						<Link className='nav-link' href='/counter/'>
							Counter
						</Link>
					</li>
					<li>
						<Link className='nav-link' href='/tracker/'>
							Tracker
						</Link>
					</li>
					<li>
						<Link className='nav-link' href='/task/'>
							Task
						</Link>
					</li>
				</ul>
			</nav>
			<AppContext.Provider value={{ state, dispatch }}>
				<Component
					{...pageProps}
					timeLeft={timeLeft}
					mode={mode}
					taskList={taskList}
					reset={reset}
					handleTaskSubmit={handleTaskSubmit}
				/>
			</AppContext.Provider>
		</div>
	);
}
