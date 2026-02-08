import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { useUsers } from './hooks/useUsers';
import './styles/App.css';

function App() {
    const { users, loading, createUser, updateUser, deleteUser } = useUsers();
    const [editingUser, setEditingUser] = useState(null);

    const handleSubmit = async (formData) => {
        if (editingUser) {
            const result = await updateUser(editingUser._id, formData);
            if (result.success) setEditingUser(null);
            return result;
        }
        return await createUser(formData);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingUser(null);
    };

    return (
        <div className="app">
            <Toaster position="top-right" />

            <header className="app-header">
                <div className="container">
                    <h1>👥 User Management</h1>
                    <p>Manage your users with ease</p>
                </div>
            </header>

            <main className="container">
                <UserForm
                    onSubmit={handleSubmit}
                    editingUser={editingUser}
                    onCancel={handleCancel}
                />

                <UserList
                    users={users}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={deleteUser}
                />
            </main>

            <footer className="app-footer">
                <div className="container">
                    <p>Have a good day.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;