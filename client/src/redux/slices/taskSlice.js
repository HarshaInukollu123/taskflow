import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/tasks');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/tasks', taskData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, updates }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/tasks/${id}`, updates);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});


export default taskSlice.reducer;