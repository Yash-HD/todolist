// src/components/TodoApp.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Task } from "../Task";
import "./App.css"; 

const auth = getAuth();

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
      } else {
        const t = await user.getIdToken();
        setToken(t);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch tasks
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTodoList(res.data))
      .catch((err) => console.error("Fetch error", err));
  }, [token]);

  const handleChange = (e) => setNewTask(e.target.value);

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/tasks",
        { taskName: newTask, completed: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodoList([...todoList, res.data]);
      setNewTask("");
    } catch (err) {
      console.error("Add error", err);
    }
  };

  const deleteTask = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodoList(todoList.filter((task) => task._id !== _id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const completeTask = async (_id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/tasks/${_id}`,
        { completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedTask = res.data;
      const updatedList = todoList.map((task) =>
        task._id === _id ? updatedTask : task
      );
      const completed = updatedList.filter((t) => t.completed);
      const incomplete = updatedList.filter((t) => !t.completed);
      setTodoList([...incomplete, ...completed]);
    } catch (err) {
      console.error("Complete error", err);
    }
  };

  return (
    <div className="App">
      <div className="addTask">
        <input value={newTask} onChange={handleChange} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list">
        {todoList.map((task) => (
          <Task
            key={task._id}
            taskName={task.taskName}
            id={task._id}
            completed={task.completed}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
