import React, { useState, useEffect, useRef } from "react";
import Login from "./login/login.jsx";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === "") {
      alert("Digite uma tarefa válida!");
      return;
    }

    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    if (inputRef.current) inputRef.current.focus();
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const handleSaveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditingText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  if (!authenticated) {
    return <Login setAuthenticated={setAuthenticated} />;
  }

  return (
    <div className="todo-container">
      <h2 className="todo-title">Lista de Tarefas</h2>

      <div className="add-task">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite uma nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">
          Adicionar
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => {
          if (editingTask === task.id) {
            return (
              <li key={task.id} className="task-item">
                <div className="task-edit-container">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="task-input"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="save-button"
                  >
                    Salvar
                  </button>
                </div>
              </li>
            );
          }

          return (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-display-container">
                <span
                  onClick={() => handleToggleComplete(task.id)}
                  className="task-text"
                >
                  {task.text}
                </span>
                <div className="task-buttons">
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
