import React, { useState } from "react";
import "../styles/To-do.css";
import Notasks from "../components/No-tasks";
import confetti from "canvas-confetti";
import { useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState(() => {

    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn("Failed to parse tasks from localStorage:", e);
      return [];
    }
  });
  const [newTask, setNewTask] = useState("");
  function handleInputChange(event) {
    setNewTask(event.target.value);
    
  }

  function addTask(e) {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (trimmed !== "") {
      setTasks(t => [
        ...t,
        {
          id: crypto.randomUUID(), 
          text: trimmed,
          done: false,
        },
      ]);
      localStorage.setItem("tasks", JSON.stringify(newTask))
      setNewTask("");
      
    }
  }

  function deleteTask(id) {
    setTasks(t => t.filter(task => task.id !== id));
  }

  function toggleDone(id) {
    setTasks(t =>
      t.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done).length;
    const progressPercent = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
     
    
  
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("[Todo] Saved tasks to localStorage:", tasks);
    } catch (err) {
      console.error("[Todo] Error writing tasks to localStorage:", err);
    }
  }, [tasks]);

     useEffect(() => {
    if (totalTasks > 0 && completedTasks === totalTasks) {
      
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
          })
        );
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      fire(0.2, {
        spread: 60,
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [completedTasks, totalTasks]);
    
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div className="container">
        <div className="todo-app">
          <h1>To-Do List</h1>
          <div className="stat-container">
            <div className="details">
                <h3>Keep it Up!</h3>
                <div id="progressbar">
                    <div id="progress"
                    style={{ width: `${progressPercent}%`}}></div>
                </div>
            </div>
            <div className="stats-number">
                <p id="numbers"> {completedTasks} / {totalTasks}</p>
            </div>
          </div>
          <div className="input-area" >
            <input
              type="text"
              id="task-input"
              placeholder="Add a new task"
              value={newTask}
              onChange={handleInputChange}
            />
            <button id="add-task-btn" onClick={addTask}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <div className="todos-container">
            {tasks.length === 0 ? (
              <Notasks />
            ) : (
              <div>
                <ul id="task-list">
                  {tasks.map(task => (
                    <li key={task.id}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={task.done}
                        onChange={() => toggleDone(task.id)}
                      />
                      <span
                        className="text"
                        style={{
                          textDecoration: task.done ? "line-through" : "none",
                          opacity: task.done ? 0.6 : 1,
                        }}
                      >
                        {task.text}
                      </span>
                      <div className="task-buttons">
                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
