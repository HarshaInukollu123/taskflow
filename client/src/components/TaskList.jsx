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

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error.message || error}</p>;

  return (
    <div className="grid gap-6 mt-6">
      {tasks.length === 0 && (
        <div className="text-center text-gray-400">No tasks available.</div>
      )}

      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            </div>
            <div className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
              {task.status}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm mt-4 text-gray-600">
            <div><span className="font-medium">Type:</span> {task.type}</div>
            <div><span className="font-medium">Priority:</span> {task.priority}</div>
            <div><span className="font-medium">Due:</span> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}</div>
            <div><span className="font-medium">Assignee:</span> {task.assignee?.name || 'Unassigned'}</div>
            <div><span className="font-medium">Reporter:</span> {task.reporter?.name || 'Unknown'}</div>
            <div>
              <span className="font-medium">Approval:</span>{" "}
              <span className={
                task.approvalStatus === 'approved' ? 'text-green-600 font-semibold'
                : task.approvalStatus === 'rejected' ? 'text-red-600 font-semibold'
                : 'text-yellow-600 font-semibold'
              }>
                {task.approvalStatus || 'pending'}
              </span>
            </div>
          </div>

          {(user?.role === "manager" || user?._id === task.assignee?._id) && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => onEdit(task)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Edit
              </button>
              {(user?.role === "manager" || user?.role === "admin") && (
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 font-medium hover:underline"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
