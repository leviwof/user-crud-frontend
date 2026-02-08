import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiPhone, FiUser } from 'react-icons/fi';

const UserCard = ({ user, onEdit, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${user.firstName} ${user.lastName}?`)) {
            onDelete(user._id);
        }
    };

    return (
        <div className="user-card">
            <div className="user-avatar">
                <FiUser />
            </div>

            <div className="user-info">
                <h3 className="user-name">
                    {user.firstName} {user.lastName}
                </h3>

                <div className="user-details">
                    <div className="detail-item">
                        <FiMail className="detail-icon" />
                        <span>{user.email}</span>
                    </div>
                    <div className="detail-item">
                        <FiPhone className="detail-icon" />
                        <span>{user.phoneNumber}</span>
                    </div>
                </div>
            </div>

            <div className="user-actions">
                <button
                    className="btn btn-icon btn-edit"
                    onClick={() => onEdit(user)}
                    title="Edit"
                >
                    <FiEdit2 />
                </button>
                <button
                    className="btn btn-icon btn-delete"
                    onClick={handleDelete}
                    title="Delete"
                >
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};

export default UserCard;