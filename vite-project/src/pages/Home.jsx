import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Home.css";

const Home = () => {
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [editingName, setEditingName] = useState(!localStorage.getItem("userName"));
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [tasksDone, setTasksDone] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [goal, setGoal] = useState(localStorage.getItem("todayGoal") || "");
  const [editingGoal, setEditingGoal] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Small progress each day adds up to big results 🌱",
    "Discipline beats motivation every single time 💪",
    "Focus on progress, not perfection ✨",
    "Your future self will thank you for today 💫",
    "Stay consistent — that’s the real superpower 🔥"
  ];

  useEffect(() => {
    const pomo = JSON.parse(localStorage.getItem("pomodoroSessions")) || 0;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(t => t.done).length;
    const notes = JSON.parse(localStorage.getItem("studyNotes")) || [];

    setPomodoroCount(pomo);
    setTasksDone(completedTasks);
    setNotesCount(notes.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNameSave = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name);
      setEditingName(false);
    }
  };

  const handleGoalSave = () => {
    localStorage.setItem("todayGoal", goal);
    setEditingGoal(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="overlay">
        <motion.div
          className="home-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          
          <motion.div
            className="greeting-box"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {editingName ? (
              <motion.div
                className="name-input-section"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2>Welcome to StudySync 💫</h2>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNameSave}
                >
                  Save
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2>{getGreeting()}, {name} 👋</h2>
                <p>Let’s make today productive!</p>
              </motion.div>
            )}
          </motion.div>

          
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              className="quote-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <p>{quotes[quoteIndex]}</p>
            </motion.div>
          </AnimatePresence>

          
          <motion.div
            className="stats-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {[
              { label: "Pomodoro Sessions", value: pomodoroCount, icon: "⏰" },
              { label: "Tasks Completed", value: tasksDone, icon: "✅" },
              { label: "Notes Saved", value: notesCount, icon: "📝" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="stat-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <h3>{item.icon} {item.value}</h3>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          
          <motion.div
            className="goal-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {editingGoal ? (
              <motion.div
                className="goal-edit"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <input
                  type="text"
                  value={goal}
                  placeholder="Set your goal for today..."
                  onChange={(e) => setGoal(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoalSave}
                >
                  Save
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="goal-display"
                onClick={() => setEditingGoal(true)}
                whileHover={{ scale: 1.02 }}
              >
                {goal ? (
                  <p>🎯 Today’s Goal: <strong>{goal}</strong></p>
                ) : (
                  <p className="set-goal-text">Click to set your goal 🎯</p>
                )}
              </motion.div>
            )}
          </motion.div>

          
          <motion.div
            className="music-player"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9RwfGbeGQwP?utm_source=generator"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </motion.div>

          
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p>✨ Stay consistent — that’s the real superpower ✨</p>
          </motion.footer>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
