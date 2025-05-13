// redux/task/taskThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from '../../api/taskService';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await taskService.getTasks();
  return res.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const res = await taskService.createTask(task);
  return res.data;
});

export const updateTaskById = createAsyncThunk('tasks/updateTask', async ({ id, task }) => {
  const res = await taskService.updateTask(id, task);
  return res.data;
});

export const deleteTaskById = createAsyncThunk('tasks/deleteTask', async (id) => {
  await taskService.deleteTask(id);
  return id;
});
