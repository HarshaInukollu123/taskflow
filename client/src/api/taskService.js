import axiosInstance from '../utils/axiosInstance';

export const getTasks = () => axiosInstance.get('/tasks');
export const createTask = (data) => axiosInstance.post('/tasks', data);
export const updateTask = (id, updates) => axiosInstance.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`);
