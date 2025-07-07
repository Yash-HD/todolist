// src/App.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import TodoApp from './pages/TodoApp'; // rename your current App logic into this

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  );
}

export default App;
