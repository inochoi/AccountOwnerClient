export const returnAccountUpdateInputConfiguration = () => (

    {
        accountType: {
            element: 'accountTypeSelect', type: 'select', value: '',
            validation: { required: true }, valid: true, touched: false,
            errorMessage: '', label: 'Account type:'
        },
        ownerId: {
            element: 'ownerSelect', type: 'select', value: '',
            validation: { required: true }, valid: true, touched: false,
            errorMessage: '', label: 'Owner Id:'
        }
    }


)