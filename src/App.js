import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("cutieTodos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [name] = useState("Dhruvika 💖");

  useEffect(() => {
    localStorage.setItem("cutieTodos", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = { text: input, completed: false };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="cutie-container">
      <h1>🌸 Cutie Todo App 🌸</h1>
      <h3>Hey {name}! Let’s slay today’s tasks 💪✨</h3>

      <div className="input-group">
        <input
          type="text"
          value={input}
          placeholder="✏️ Add a cute task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>➕ Add</button>
      </div>

      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
              />
              {task.text}
            </label>
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

