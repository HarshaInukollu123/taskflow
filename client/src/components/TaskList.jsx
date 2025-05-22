import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/slices/taskSlice';

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);

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
      {tasks.length === 0 && (
        <p className="text-gray-500 text-sm">No tasks found.</p>
      )}

      {tasks.map(task => (
        <div key={task._id} className="border p-4 rounded shadow-sm bg-white">
          <div className="font-bold text-lg">{task.title}</div>
          <p className="text-sm text-gray-600 mb-1">{task.description}</p>

          <div className="text-sm text-gray-700">
            <span className="font-medium">Type:</span> {task.type} |{" "}
            <span className="font-medium">Priority:</span> {task.priority}
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-medium">Status:</span> {task.status}
          </div>

          <div className="text-sm text-gray-700">
            <span className="font-medium">Assignee:</span>{" "}
            {task.assignee?.name || "Unassigned"}
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-medium">Reporter:</span>{" "}
            {task.reporter?.name || "Unknown"}
          </div>

          <div className="text-sm text-gray-500">
            <span className="font-medium">Due Date:</span>{" "}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}
          </div>

          <div className="mt-3 flex gap-3">
            {(user?.role === "manager" || user?._id === task.assignee?._id) && (
              <button onClick={() => onEdit(task)} className="text-blue-500 hover:underline">
                Edit
              </button>
            )}
            {user?.role === "manager" || user?.role === "admin" ? (
              <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:underline">
                Delete
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
