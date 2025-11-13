import React, { useState, useEffect, useRef } from "react";
import "../styles/PomodoroTimer.css";

const PomodoroTimer = () => {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [quote, setQuote] = useState("Let’s crush this session ⚡");
  const timerRef = useRef(null);

  const quotes = [
    "Stay focused. You’re doing great!",
    "Discipline beats motivation.",
    "Deep work = Big results.",
    "One session at a time 🔥",
    "You got this 💪"
  ];

  useEffect(() => {
    setTimeLeft(focusDuration * 60);
  }, [focusDuration]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            const nextIsBreak = !isBreak;
            setIsBreak(nextIsBreak);
            setIsRunning(false);
            if (!nextIsBreak) setSessionCount((prev) => prev + 1);
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
            return nextIsBreak ? breakDuration * 60 : focusDuration * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, isBreak, focusDuration, breakDuration]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(focusDuration * 60);
  };

  const handleSwitchToBreak = () => {
    clearInterval(timerRef.current);
    setIsBreak(true);
    setIsRunning(false);
    setTimeLeft(breakDuration * 60);
  };

  const totalTime = isBreak ? breakDuration * 60 : focusDuration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="pomodoro-dark">
      <div className="glass-dark">
        <h2 className="mode-title">{isBreak ? "Break Time ☕" : "Focus Mode 🔥"}</h2>

        <div className="circle">
          <svg className="progress-ring" viewBox="0 0 120 120">
            <circle className="progress-ring-bg" cx="60" cy="60" r="54" />
            <circle
              className="progress-ring-bar"
              cx="60"
              cy="60"
              r="54"
              style={{ strokeDashoffset: 339 - (progress / 100) * 339 }}
            />
          </svg>
          <div className="time">{formatTime(timeLeft)}</div>
        </div>

        <div className="buttons">
          <button onClick={handleStartPause} className="btn-dark">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset} className="btn-dark secondary">
            Reset
          </button>
          <button onClick={handleSwitchToBreak} className="btn-dark accent">
            Switch to Break
          </button>
        </div>

        <div className="settings">
          <div>
            <label>Focus:</label>
            <select
              value={focusDuration}
              onChange={(e) => setFocusDuration(Number(e.target.value))}
            >
              <option value={15}>15 min</option>
              <option value={25}>25 min</option>
              <option value={45}>45 min</option>
              <option value={50}>50 min</option>
            </select>
          </div>
          <div>
            <label>Break:</label>
            <select
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
            >
              <option value={5}>5 min</option>
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
            </select>
          </div>
        </div>

        <p className="session">Pomodoros Completed: {sessionCount}</p>
        <p className="quote">“{quote}”</p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
