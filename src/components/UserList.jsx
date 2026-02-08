import React from 'react';
import UserCard from './UserCard';
import { FiUsers, FiInbox } from 'react-icons/fi';

const UserList = ({ users, loading, onEdit, onDelete }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading users...</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="empty-state">
                <FiInbox className="empty-icon" />
                <h3>No Users Found</h3>
                <p>Add your first user using the form above</p>
            </div>
        );
    }

    return (
        <div className="user-list-container">
            <div className="list-header">
                <h2>
                    <FiUsers /> Users ({users.length})
                </h2>
            </div>

            <div className="user-grid">
                {users.map(user => (
                    <UserCard
                        key={user._id}
                        user={user}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserList;