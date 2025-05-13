import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const TasksPage = () => {
  const [editTask, setEditTask] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <TaskForm editingTask={editTask} onSuccess={() => setEditTask(null)} />
      <TaskList onEdit={setEditTask} />
    </div>
  );
};

export default TasksPage;
