// ⭐ EXTENSIBILITY: Add new fields here - UI auto-generates!
export const userFormConfig = {
    fields: [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter first name',
            required: true,
            validation: {
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Only letters allowed, 2-50 characters'
            }
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter last name',
            required: true,
            validation: {
                minLength: 2,
                maxLength: 50,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Only letters allowed, 2-50 characters'
            }
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            type: 'tel',
            placeholder: 'Enter 10-digit phone number',
            required: true,
            validation: {
                pattern: /^\d{10}$/,
                message: 'Must be exactly 10 digits'
            }
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            placeholder: 'Enter email address',
            required: true,
            validation: {
                pattern: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email address'
            }
        }

        // ⭐ TO ADD NEW FIELD - Just add object here!
        // Example:
        // {
        //   name: 'dateOfBirth',
        //   label: 'Date of Birth',
        //   type: 'date',
        //   required: false,
        //   validation: { message: 'Enter valid date' }
        // },
        // {
        //   name: 'address',
        //   label: 'Address',
        //   type: 'textarea',
        //   placeholder: 'Enter address',
        //   required: false
        // }
    ]
};

// Generate initial form state from config
export const getInitialFormState = () => {
    return userFormConfig.fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});
};