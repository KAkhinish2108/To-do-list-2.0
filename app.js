import React, { useState, useEffect } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom/client";

function App() {
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dark, setDark] = useState(false);
  const [time, setTime] = useState(new Date());

  /* ================= TIMEZONE ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      const el = document.getElementById("time");
      if (el) el.innerText = new Date().toLocaleString();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ================= LOGIN ================= */
  useEffect(() => {
    const form = document.querySelector(".login-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (user.trim()) setLoggedIn(true);
    });
  }, [user]);

  /* ================= THEME ================= */
  useEffect(() => {
    document.body.style.background = dark ? "#0f0f0f" : "#f5f7fa";
    document.body.style.color = dark ? "#f5f5f5" : "#1a1a1a";
  }, [dark]);

  /* ================= TODO ================= */
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <>
      {/* LOGIN */}
      {!loggedIn && (
        <></>
      )}

      {/* TODO */}
      {loggedIn && (
        <section className="todo-section">
          <h2>Welcome, {user}</h2>

          <div className="todo-input">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Define your task"
            />
            <button onClick={addTask}>Add</button>
          </div>

          <ul className="todo-list">
            {tasks.map((t, i) => (
              <li
                key={i}
                className="todo-item"
                style={{ textDecoration: t.done ? "line-through" : "none" }}
              >
                <span>{t.text}</span>
                <button onClick={() => toggleTask(i)}>✔</button>
              </li>
            ))}
          </ul>

          <button className="theme-btn" onClick={() => setDark(!dark)}>
            Toggle Theme
          </button>
        </section>
      )}

      {/* INPUT BINDING */}
      <input
        type="hidden"
        onChange={(e) => setUser(e.target.value)}
      />
    </>
  );
}

ReactDOM.createRoot(document.body).render(<App />);
