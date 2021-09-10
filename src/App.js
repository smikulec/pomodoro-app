import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import BreakLength from './components/BreakLength';
import SessionLength from './components/SessionLength';
import SessionCounter from './components/SessionCounter';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Timer from './components/Timer';
import './App.css';

export default function App() {
  
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [mode, setMode] = useState("session");
  const [timeLeft, setTimeLeft] = useState();
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [breakCounter, setBreakCounter] = useState(0);
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTimeLeft( mode === "session" ? sessionLength * 1000 : breakLength * 1000);
  }, [sessionLength, breakLength]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 1) {
      setTimeLeft (
        mode === "session" ? sessionLength * 1000 - timeSpent : breakLength * 1000 - timeSpent
      );

      interval = setInterval (() => {
        setTimeSpent((timeSpent) => timeSpent + 1000)
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      setTimeSpent(0);
      setMode((mode) => (mode === "session" ? "break" : "session"));
      setTimeLeft(
        mode === "session" ? sessionLength * 1000 : breakLength * 1000
      );
      setSessionCounter( mode === "session" ? sessionCounter + 1 : sessionCounter);
      setBreakCounter( mode === "break" ? breakCounter + 1 : breakCounter); 
    }

    return () => clearInterval(interval);

  }, [isActive, timeSpent])

  useEffect(() => {
    
  }, [task]);

  
  const decrementBreakLength = () => {
    const decreasedBreakLength = breakLength - 60 > 60 ? breakLength - 60 : 60;
    setBreakLength(decreasedBreakLength);
  }

  const incrementBreakLength = () => {
    const incrementedBreakLength = breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60; 
    setBreakLength(incrementedBreakLength);
  }

  const decrementSessionLength = () => {
    const decreasedSessionLength = sessionLength - 60 > 60 ? sessionLength - 60 : 60;
    setSessionLength(decreasedSessionLength);
  }

  const incrementSessionLength = () => {
    const incrementedSessionLength = sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60 * 60; 
    setSessionLength(incrementedSessionLength);
  }

  const reset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft( mode === "session" ? sessionLength * 1000 : breakLength * 1000);

    if (isActive) {
      setIsActive(false);
      setTimeSpent(0);
    }
  }

  const toggleIsActive = () => {
    setIsActive(!isActive);
  }

  const handleCreateTask = (input) => {
    setTask(input);
    setTaskList((taskList) => [...taskList, input]);
    
  }

  function Home() {
    return(
      <div>
        <h1>Welcome.</h1>
        <h2>Here you can track your productivity using pomodoro technique.</h2>
      </div>
    ); 
  }

  function Settings() {
    return(
      <div>
        <h1>How long do you want your sessions to be?</h1>
        <TaskForm onCreateTask={handleCreateTask}/>
        <div className="settings-container">
          <SessionLength
            length={sessionLength}
            increment={incrementSessionLength}
            decrement={decrementSessionLength}
          />
          <BreakLength 
            length={breakLength}
            increment={incrementBreakLength}
            decrement={decrementBreakLength}
          />
        </div>
      </div>
    );
  }

  function PomodoroCounter() {
    return(
      <div>      
        <div className="timer-container">
        {/*  <p>{task.name}</p> */}
          <Timer time={timeLeft} mode={mode}/>
          <button 
            className="active-button"
            onClick={toggleIsActive}
          >
            { isActive ? "Pause" : "Start"}
          </button>
          <button 
            className="reset-button"
            onClick={reset}
          >
              Reset
          </button>
        </div>
      </div>
    );
  }

  function TaskTracker() {
    return (
      <div>
        <h1>How is your productivity doing today?</h1>
        <SessionCounter 
          sessionCounter={sessionCounter} 
          breakCounter={breakCounter}
        />
       <TaskList items={taskList}/>
      </div>
    );
  }


  return (
    <BrowserRouter>
      <div className="App">
        <h1>Pomodoro Productivity Tracker</h1>
        <nav className="nav-bar">
          <ul className="nav-list">

            <li>
              <Link className="nav-link" to="/settings/">Settings</Link>
            </li>
            <li>
              <Link className="nav-link" to="/counter/">Counter</Link>
            </li>
            <li>
              <Link className="nav-link" to="/tracker/">Tracker</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" component={Home}/>
        <Route path="/settings/" component={Settings}/>
        <Route path="/counter/" component={PomodoroCounter}/>
        <Route path="/tracker/" component={TaskTracker}/>
      </div>
    </BrowserRouter>
  );
}
