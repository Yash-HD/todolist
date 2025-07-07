import './App.css';
import { useState , useEffect } from 'react';
import axios from 'axios';
import {Task} from '../Task'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const auth = getAuth();

function TodoApp() {
  const [todoList,setTodoList] = useState([]);
  const [newTask,setNewTask] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // user not logged in → go to login
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => {
        setTodoList(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleChange=(event)=>{
    setNewTask(event.target.value);
  }

  const addTask = async () => {
  if (!newTask.trim()) return; // prevent empty task

  try {
    const response = await axios.post('http://localhost:5000/tasks', {
      taskName: newTask,
      completed: false,
    });

    setTodoList([...todoList, response.data]); // add the new task from MongoDB
    setNewTask(""); // clear input
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

  const deleteTask = async (_id) => {
  try {
    await axios.delete(`http://localhost:5000/tasks/${_id}`);
    setTodoList(todoList.filter((task) => task._id !== _id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

  const completeTask = async (_id) => {
  try {
    const response = await axios.put(`http://localhost:5000/tasks/${_id}`, {
      completed: true,
    });

    const updatedTask = response.data;

    // Replace the updated task and reorder
    const updatedList = todoList.map((task) =>
      task._id === _id ? updatedTask : task
    );
    const completedList = updatedList.filter((task) => task.completed);
    const incompletedList = updatedList.filter((task) => !task.completed);
    setTodoList([...incompletedList, ...completedList]);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};


  return (
    <div className="App">
      <div className='addTask'>
      <input value={newTask} onChange={handleChange}/>
      <button onClick={addTask}>Add Task</button>
      </div>
      <div className='list'>
        {todoList.map((task)=>{
          return <Task taskName={task.taskName} id={task._id} completed={task.completed} deleteTask={deleteTask} completeTask={completeTask}/>
        })}
      </div>
    </div>
  );
}
export default TodoApp;