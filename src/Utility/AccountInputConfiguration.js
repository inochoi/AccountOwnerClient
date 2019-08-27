
export const returnAccountInputConfiguration = () => {
    return {

        accountType: {
            element: 'accountTypeSelect', type: 'select', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Account type:'
        },
        owner: {
            element: 'ownerSelect', type: 'select', value: '',
            validation: { required: true }, valid: false, touched: false,
            errorMessage: '', label: 'Owner:'
        }
    }
}