import moment from 'moment';

export const returnInputConfiguration = () => {
    return {
        name: {
            element: 'input', type: 'text', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Name:'
        },
        address: {
            element: 'input', type: 'text', value: '',
            validation: { required: true, maxLength: 60 }, valid: false, touched:
                false,
            errorMessage: '', label: 'Address:'
        },
        dateOfBirth: {
            element: 'datePicker', type: 'text', value: moment(),
            valid: true, touched: false,
            errorMessage: '', label: 'Date of birth:'
        },
        accountType: {
            element: 'select', type: 'text', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Account type:'
        }
    }
}