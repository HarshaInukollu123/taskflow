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

  if (!['manager', 'admin'].includes(user?.role)) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Task title"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Describe the task"
            rows="4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option>Task</option>
              <option>Bug</option>
              <option>Story</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Assignee</label>
            <select
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded"
              required
            >
              <option value="">Select</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          {editingTask ? 'Update Task' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
