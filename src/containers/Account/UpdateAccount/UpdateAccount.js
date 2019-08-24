import React, { useState, useEffect } from 'react';
import { Form, Well, Button, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { returnAccountInputConfiguration } from '../../../Utility/AccountInputConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import moment from 'moment';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';

const UpdateAccount = (props) => {
    const account = useSelector(state => state.repository.userToUpdate);

    const [accountForm, setAccountForm] = useState(returnAccountInputConfiguration());
    const [isFormValid, setIsFormValid] = useState(true);

    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    const ownerInfo = useSelector(state => state.repository.data);

    const dispatch = useDispatch();

    useEffect(() => {
        let url = '/api/owner/' + account.ownerId;
        return () => {
            dispatch(repositoryActions.getData(url, { ...props }));
        }
        console.log(url)
    }, [ props, dispatch])

    let typeError = null;
    if (!accountForm.accountType.valid && accountForm.accountType.validation && accountForm.accountType.touched) {
        typeError = (<em>{accountForm.accountType.errorMessage}</em>);
    }
    let ownerError = null;
    if (!accountForm.owner.valid && accountForm.owner.validation && accountForm.owner.touched) {
        ownerError = (<em>{accountForm.owner.errorMessage}</em>);
    }

    const updateAccount = (event) => {
        event.preventDefault();

        const accountToUpdate = {
            accountType: account.accountType,
            owner: account.owner
        }

        const url = '/api/account/' + props.match.params.id;
        dispatch(repositoryActions.putData(url, accountToUpdate, { ...props }))
    }


    const handleChange = (e, id) => {
        const updateAccountForm = { ...accountForm };
        updateAccountForm[id] =
            FormUtilityActions.executeValidationAndReturnFormElement(e, updateAccountForm, id);
        const counter = FormUtilityActions.countInvalidElements(updateAccountForm);
        setAccountForm(updateAccountForm);
        setIsFormValid(counter === 0);
        dispatch({ type: 'UPDATE_USER_TO_UPDATE', data: { ...account, [e.target.name]: e.target.value } })
    }
    const handleDateChange = e => {
        dispatch({ type: 'UPDATE_USER_TO_UPDATE', data: { ...account, dateOfBirth: e } })
    }

    const redirectToAccountList = () => {
        props.history.push('/account-list');
    }

    console.log(accountForm);
    console.log(account);
    console.log(ownerInfo);

    return (
        <Well>
            <Form horizontal onSubmit={updateAccount}>
                <FormGroup controlId='accountType'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Account Type:
                    </Col>
                    <Col sm={6}>
                        <FormControl
                            name='accountType'
                            type='text'
                            value={account.accountType}
                            onChange=
                            {e => handleChange(e, 'accountType')}
                            onBlur=
                            {handleChange}
                        />
                    </Col>
                    <Col>
                        <em>{typeError}</em>
                    </Col>
                </FormGroup>
                <br />
                <FormGroup controlId='owner'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Owner:
                    </Col>
                    <Col sm={6}>
                        <FormControl
                            name='owner'
                            type='text'
                            value={account.owner}
                            onChange=
                            {e => handleChange(e, 'owner')}
                            onBlur=
                            {handleChange}
                        />
                    </Col>
                    <Col>
                        <em>{ownerError}</em>
                    </Col>
                </FormGroup>
                <br />
                <FormGroup>
                    <Col mdOffset={6} md={1}>
                        <Button type='submit' bsStyle='info' disabled=
                            {!isFormValid}>Update</Button>
                    </Col>
                    <Col md={1}>
                        <Button bsStyle='danger' onClick={redirectToAccountList}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
            <SuccessModal show={showSuccessModal}
                modalHeaderText={'Success message'}
                modalBodyText={'Action completed successfully'}
                okButtonText={'OK'}
                successClick={() => dispatch(repositoryActions.closeSuccessModal({ ...props }, '/account-List'))} />
            <ErrorModal show={showErrorModal}
                modalHeaderText={'Error message'}
                modalBodyText={errorMessage}
                okButtonText={'OK'}
                closeModal={() => dispatch(errorHandlerActions.closeErrorModal())} />
        </Well>
    )
}

export default UpdateAccount;