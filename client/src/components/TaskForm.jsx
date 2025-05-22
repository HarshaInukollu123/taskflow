import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../redux/slices/taskSlice';
import axiosInstance from '../utils/axiosInstance';

const TaskForm = ({ editingTask, onSuccess }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Task',
    priority: 'Medium',
    status: 'To Do',
    assignee: '',
    dueDate: '',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        type: editingTask.type || 'Task',
        priority: editingTask.priority || 'Medium',
        status: editingTask.status || 'To Do',
        assignee: editingTask.assignee || '',
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '',
      });
    }
  }, [editingTask]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data);
        console.log(res);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      reporter: user._id,
    };

    if (editingTask) {
      await dispatch(updateTask({ id: editingTask._id, updates: payload }));
    } else {
      await dispatch(createTask(payload));
    }

    setFormData({
      title: '',
      description: '',
      type: 'Task',
      priority: 'Medium',
      status: 'To Do',
      assignee: '',
      dueDate: '',
    });

    onSuccess?.();
  };

  if (user?.role !== 'manager' && user?.role !== 'admin') return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow mb-6">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option>Task</option>
        <option>Bug</option>
        <option>Story</option>
      </select>
      <select name="priority" value={formData.priority} onChange={handleChange} className="w-full p-2 border rounded">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>
      <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <select
        name="assignee"
        value={formData.assignee}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Assignee</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.role})
          </option>
        ))}
      </select>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        {editingTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
