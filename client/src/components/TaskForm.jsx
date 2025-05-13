// client/src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask } from '../redux/slices/taskSlice';

const TaskForm = ({ editingTask, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTask) {
      await dispatch(updateTask({ id: editingTask._id, updates: formData }));
    } else {
      await dispatch(createTask(formData));
    }
    setFormData({ title: '', description: '', status: 'To Do' });
    onSuccess?.(); // reset editing state in parent
  };

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
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        {editingTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
