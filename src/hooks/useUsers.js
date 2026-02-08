import { useState, useEffect, useCallback } from 'react';
import userService from '../services/api';
import toast from 'react-hot-toast';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await userService.getAll();
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    }, []);

    const createUser = async (userData) => {
        try {
            const response = await userService.create(userData);
            setUsers(prev => [response.data, ...prev]);
            toast.success('User created successfully!');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to create user';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const updateUser = async (id, userData) => {
        try {
            const response = await userService.update(id, userData);
            setUsers(prev => prev.map(user =>
                user._id === id ? response.data : user
            ));
            toast.success('User updated successfully!');
            return { success: true };
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to update user';
            toast.error(message);
            return { success: false, error: message };
        }
    };

    const deleteUser = async (id) => {
        try {
            await userService.delete(id);
            setUsers(prev => prev.filter(user => user._id !== id));
            toast.success('User deleted successfully!');
            return { success: true };
        } catch (err) {
            toast.error('Failed to delete user');
            return { success: false };
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser
    };
};