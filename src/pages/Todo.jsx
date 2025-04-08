import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://todo-backend-lisc.onrender.com/api/todos', headers);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://todo-backend-lisc.onrender.com/api/todos', { title: newTodo }, headers);
      setNewTodo('');
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://todo-backend-lisc.onrender.com/api/todos/${id}`, headers);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodoId(todo._id);
    setEditValue(todo.title);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://todo-backend-lisc.onrender.com/api/todos/${id}`, { title: editValue }, headers);
      setEditingTodoId(null);
      setEditValue('');
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await axios.put(`https://todo-backend-lisc.onrender.com/api/todos/${id}`, { completed: !currentStatus }, headers);
      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, []);

  return (
    <div className="container">
      <h2>Todo List</h2>
      <form onSubmit={handleAdd}>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter todo" required />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo._id, todo.completed)}
            />
            {editingTodoId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleUpdate(todo._id)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
                <button onClick={() => handleEdit(todo)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Todo;
