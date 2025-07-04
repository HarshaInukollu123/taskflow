import axiosInstance from '../utils/axiosInstance';

export const getTasks = () => axiosInstance.get('/tasks');
export const createTask = (data) => axiosInstance.post('/tasks', data);
export const updateTask = (id, updates) => axiosInstance.put(`/tasks/${id}`, updates);
export const deleteTask = (id) => axiosInstance.delete(`/tasks/${id}`);
export const getPendingTasks = () => axiosInstance.get('/tasks/pending');

export const updateApprovalStatus = (id, status) => {
    if (status === 'approved') {
      return axiosInstance.patch(`/tasks/${id}/approve`);
    } else if (status === 'rejected') {
      return axiosInstance.patch(`/tasks/${id}/reject`);
    } else {
      throw new Error('Invalid approval status');
    }
  };
  
