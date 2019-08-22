export const convertStateToArrayOfFormObjects = (formObject) => {
    const formElementsArray = [];
    for (let key in formObject) {
        formElementsArray.push({
            id: key,
            config: formObject[key]
        });
    }
    return formElementsArray;
}

const checkValidity = (value, validation) => {
    let validationObject = {
        isValid: true,
        errorMessage: ''
    };
    if (validation) {
        if (validation.required) {
            validationObject.isValid = value.trim() !== '';
            validationObject.errorMessage = validationObject.isValid ? '' : 'Field is required';
        }
        if (validationObject.isValid && validation.maxLength) {
            validationObject.isValid = value.length <= validation.maxLength;
            validationObject.errorMessage = `Not allowed more than ${validation.maxLength} characters`;
        }
        return validationObject;
    }
    else {
        return validationObject;
    }
}

export const executeValidationAndReturnFormElement = (event, updatedForm, id) => {
    let formElement = { ...updatedForm[id] };
    formElement.value = id === 'dateOfBirth' ? event : event.target.value;
    formElement.touched = true;
    const validationResponse = checkValidity(formElement.value,
        formElement.validation);
    formElement.valid = validationResponse.isValid;
    formElement.errorMessage = validationResponse.errorMessage;
    return formElement;
}

export const countInvalidElements = (Form) => {
    let countInvalidElements = 0;
    for (let element in Form) {
        if (!Form[element].valid) {
            countInvalidElements = countInvalidElements + 1;
            break;
        }
    }
    return countInvalidElements;
}