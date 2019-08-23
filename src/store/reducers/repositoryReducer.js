import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: null,
    showSuccessModal: false,
    userToUpdate: {}
}

const executeGetDataSuccess = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}
const executePostDataSuccess = (state, action) => {
    return {
        ...state,
        showSuccessModal: true
    }
}
const executePutDataSuccess = (state, action) => {
    return {
        ...state,
        showSuccessModal: true
    }
}
const executeDeleteDataSuccess = (state, action) => {
    return {
        ...state,
        showSuccessModal: true
    }
}

const executeCloseSuccessModal = (state, action) => {
    action.props.history.push(action.url);
    return {
        ...state,
        showSuccessModal: false
    }
}
const executeEditDataSuccess = (state, action) => {
    return {
        ...state,
        userToUpdate: action.data
    }
}
const executeUpdateUserToUpdateSuccess = (state, action) => {
    return {
        ...state,
        userToUpdate: action.data
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_SUCCESS:
            return executeGetDataSuccess(state, action);
        case actionTypes.POST_DATA_SUCCESS:
            return executePostDataSuccess(state, action);
        case actionTypes.PUT_DATA_SUCCESS:
            return executePutDataSuccess(state, action);
        case actionTypes.DELETE_DATA_SUCCESS:
            return executeDeleteDataSuccess(state, action);
        case actionTypes.CLOSE_SUCCESS_MODAL:
            return executeCloseSuccessModal(state, action)
        case actionTypes.EDIT_DATA_SUCCESS:
            return executeEditDataSuccess(state, action)
        case actionTypes.UPDATE_USER_TO_UPDATE:
            return executeUpdateUserToUpdateSuccess(state, action)
        default:
            return state;
    }
}
export default reducer;