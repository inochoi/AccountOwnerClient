
export const returnAccountUpdateInputConfiguration = () => {
    return {
        
        accountType: {
            element: 'accountTypeSelect', type: 'select', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Account type:'
        },
        ownerId: {
            element: 'ownerSelect', type: 'select', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Owner:'
        }
    }
}