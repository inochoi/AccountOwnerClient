export const returnOwnerUpdateInputConfiguration = () => {
    return {
        name: {
            element: 'input', type: 'text', value: '',
            validation: { required: true }, valid: true, touched: false,
            errorMessage: '', label: 'Name:'
        },
        address: {
            element: 'input', type: 'text', value: '',
            validation: { required: true, maxLength: 60 }, valid: true, touched:
                false,
            errorMessage: '', label: 'Address:'
        },
        dateOfBirth: {
            element: 'datePicker', type: 'text', value: '',
            valid: true, touched: false,
            errorMessage: '', label: 'Date of birth:'
        }
    }
}