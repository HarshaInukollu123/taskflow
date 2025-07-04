import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingTasks, updateApprovalStatus } from "../redux/slices/taskSlice";

const ApprovalsPage = () => {
  const dispatch = useDispatch();
  const { pendingTasks, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "manager" || user?.role === "admin") {
      dispatch(fetchPendingTasks());
    }
  }, [dispatch, user]);

  const handleAction = (taskId, status) => {
    dispatch(updateApprovalStatus({ id: taskId, status }));
  };

  if (loading) return <p className="text-center">Loading pending tasks...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Approvals</h2>
      {pendingTasks.length === 0 ? (
        <p className="text-gray-500">No tasks pending approval.</p>
      ) : (
        <div className="space-y-4">
          {pendingTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded shadow flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Reporter:</strong> {task.reporter?.name} | <strong>Assignee:</strong> {task.assignee?.name}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleAction(task._id, "approved")}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(task._id, "rejected")}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalsPage;
