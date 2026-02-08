import React from 'react';

// ⭐ Renders any field type based on config
const DynamicField = ({ field, value, onChange, error }) => {
    const { name, label, type, placeholder, required } = field;

    const inputProps = {
        id: name,
        name,
        value: value || '',
        onChange: (e) => onChange(name, e.target.value),
        placeholder,
        required,
        className: `form-input ${error ? 'input-error' : ''}`
    };

    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return <textarea {...inputProps} rows={3} />;

            case 'select':
                return (
                    <select {...inputProps}>
                        <option value="">Select {label}</option>
                        {field.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                );

            default:
                return <input type={type} {...inputProps} />;
        }
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            {renderInput()}
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default DynamicField;