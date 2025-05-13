// client/src/components/TaskList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/taskSlice';

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-600">Error: {error.message || error}</p>;

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task._id} className="border p-4 rounded shadow-sm">
          <div className="font-bold text-lg">{task.title}</div>
          <div className="text-sm text-gray-500">{task.status}</div>
          <div className="mt-2 flex gap-3">
            <button onClick={() => onEdit(task)} className="text-blue-500">Edit</button>
            <button onClick={() => handleDelete(task._id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
