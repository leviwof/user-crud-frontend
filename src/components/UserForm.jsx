import React, { useState, useEffect } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import DynamicField from './DynamicField';
import { userFormConfig, getInitialFormState } from '../config/formConfig';

const UserForm = ({ onSubmit, editingUser, onCancel }) => {
    const [formData, setFormData] = useState(getInitialFormState());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        } else {
            setFormData(getInitialFormState());
        }
        setErrors({});
    }, [editingUser]);

    const validateField = (field, value) => {
        if (field.required && !value?.trim()) {
            return `${field.label} is required`;
        }

        if (field.validation && value) {
            const { pattern, minLength, maxLength, message } = field.validation;

            if (minLength && value.length < minLength) {
                return message || `Minimum ${minLength} characters required`;
            }

            if (maxLength && value.length > maxLength) {
                return message || `Maximum ${maxLength} characters allowed`;
            }

            if (pattern && !pattern.test(value)) {
                return message || 'Invalid format';
            }
        }

        return null;
    };

    const validateForm = () => {
        const newErrors = {};

        userFormConfig.fields.forEach(field => {
            const error = validateField(field, formData[field.name]);
            if (error) {
                newErrors[field.name] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        const result = await onSubmit(formData);
        setIsSubmitting(false);

        if (result.success) {
            setFormData(getInitialFormState());
            setErrors({});
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                {editingUser && (
                    <button className="btn btn-icon" onClick={onCancel}>
                        <FiX />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    {userFormConfig.fields.map(field => (
                        <DynamicField
                            key={field.name}
                            field={field}
                            value={formData[field.name]}
                            onChange={handleChange}
                            error={errors[field.name]}
                        />
                    ))}
                </div>

                <div className="form-actions">
                    {editingUser && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        <FiSave />
                        {isSubmitting ? 'Saving...' : editingUser ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;