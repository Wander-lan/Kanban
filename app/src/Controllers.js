import axios from 'axios';

const createTask = async (taskName, taskDescription) => {
    try {
        const response = await axios.post('http://localhost:3001/tasks', {
            name: taskName,
            description: taskDescription,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://localhost:3001/tasks/${taskId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateTaskStatus = async (taskId, newStatus) => {
    try {
        const response = await axios.put(`http://localhost:3001/tasks/${taskId}/status`, {
            status: newStatus,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateTaskTitle = async (taskId, newTitle) => {
    try {
        const response = await axios.put(`http://localhost:3001/tasks/${taskId}/name`, {
            name: newTitle,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateTaskDescription = async (taskId, newDescription) => {
    try {
        const response = await axios.put(`http://localhost:3001/tasks/${taskId}/description`, {
            description: newDescription,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const Controllers = {
    createTask,
    deleteTask,
    updateTaskStatus,
    updateTaskTitle,
    updateTaskDescription,
};
  
export default Controllers;