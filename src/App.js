import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SessionLength from './components/SessionLength';
import SessionCounter from './components/SessionCounter';
import Timer from './components/Timer';
import {
	incrementLength,
	decrementLength,
} from './containers/LengthCalculatorContainer';
import './App.css';

export default function App() {
	const [breakLength, setBreakLength] = useState(5 * 60);
	const [sessionLength, setSessionLength] = useState(25 * 60);
	const [isActive, setIsActive] = useState(false);
	const [mode, setMode] = useState('session');
	const [timeSpent, setTimeSpent] = useState(0);
	const [sessionCounter, setSessionCounter] = useState(0);
	const [breakCounter, setBreakCounter] = useState(0);

	const toggleIsActive = () => {
		setIsActive(!isActive);
	};

	const timeLeft =
		(mode === 'session' ? sessionLength : breakLength) * 1000 - timeSpent;

	useEffect(() => {
		let interval = null;

		if (isActive && timeLeft > 1) {
			interval = setInterval(() => {
				setTimeSpent((timeSpent) => timeSpent + 1000);
			}, 1000);
		} else {
			clearInterval(interval);
		}

		if (timeLeft === 0) {
			setTimeSpent(0);
			setMode((mode) => (mode === 'session' ? 'break' : 'session'));
			setSessionCounter(
				mode === 'session' ? sessionCounter + 1 : sessionCounter
			);
			setBreakCounter(mode === 'break' ? breakCounter + 1 : breakCounter);
		}

		return () => clearInterval(interval);
	}, [isActive, timeSpent]);

	const reset = () => {
		setBreakLength(5 * 60);
		setSessionLength(25 * 60);

		if (isActive) {
			setIsActive(false);
			setTimeSpent(0);
		}
	};

	function Settings() {
		return (
			<div>
				<h1>How long do you want your sessions to be?</h1>
				<div className='settings-container'>
					<SessionLength
						type='work'
						length={sessionLength}
						increment={() => setSessionLength(incrementLength(sessionLength))}
						decrement={() => setSessionLength(decrementLength(sessionLength))}
					/>
					<SessionLength
						type='break'
						length={breakLength}
						increment={() => setBreakLength(incrementLength(breakLength))}
						decrement={() => setBreakLength(decrementLength(breakLength))}
					/>
				</div>
			</div>
		);
	}

	function PomodoroCounter() {
		return (
			<div>
				<div className='timer-container'>
					<Timer time={timeLeft} mode={mode} />
					<button className='active-button' onClick={toggleIsActive}>
						{isActive ? 'Pause' : 'Start'}
					</button>
					<button className='reset-button' onClick={reset}>
						Reset
					</button>
				</div>
			</div>
		);
	}

	function ProductivityTracker() {
		return (
			<div>
				<h1>How is your productivity doing today?</h1>
				<SessionCounter
					sessionCounter={sessionCounter}
					breakCounter={breakCounter}
				/>
			</div>
		);
	}

	return (
		<BrowserRouter>
			<div className='App'>
				<h1>Pomodoro Productivity Tracker</h1>
				<nav className='nav-bar'>
					<ul className='nav-list'>
						<li>
							<Link className='nav-link' to='/settings/'>
								Settings
							</Link>
						</li>
						<li>
							<Link className='nav-link' to='/counter/'>
								Counter
							</Link>
						</li>
						<li>
							<Link className='nav-link' to='/tracker/'>
								Tracker
							</Link>
						</li>
					</ul>
				</nav>

				<Route path='/' component={Home} />
				<Route path='/settings/' component={Settings} />
				<Route path='/counter/' component={PomodoroCounter} />
				<Route path='/tracker/' component={ProductivityTracker} />
			</div>
		</BrowserRouter>
	);
}
