import React, { useState, useEffect } from 'react';
import { Form, Well, Button, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { returnAccountUpdateInputConfiguration } from '../../../Utility/AccountUpdateInputConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import moment from 'moment';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';

const UpdateAccount = (props) => {

    const account = useSelector(state => state.repository.userToUpdate);
    const accountOwner = useSelector(state => state.repository.userToUpdate.owners);
    const owner = useSelector(state => state.repository.data);

    let idxToSlice = owner.findIndex(x => x.id == account.ownerId);

    let newArr1;
    let newArr2;
    let newArr3;

    if (idxToSlice == owner.lastIndexOf()) {
        newArr3 = owner.slice(0, idxToSlice);
    } else {
        newArr1 = owner.slice(0, idxToSlice);
        newArr2 = owner.slice(idxToSlice + 1, owner.length);
        newArr3 = newArr1.concat(newArr2);
    }

    // useEffect(() => {
    //     let url = '/api/owner/';
    //     dispatch(repositoryActions.getData(url, { ...props }));
    // }, [props, dispatch])

    // const account = useSelector(state => state.repository.userToUpdate);

    const [accountForm, setAccountForm] = useState(returnAccountUpdateInputConfiguration());
    const [isFormValid, setIsFormValid] = useState(true);

    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    // const ownerInfo = useSelector(state => state.repository.data);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     let url = '/api/owner/' + account.ownerId;
    //     return () => {
    //         dispatch(repositoryActions.getData(url, { ...props }));
    //     }
    //     console.log(url)
    // }, [ props, dispatch])

    let typeError = null;
    if (!accountForm.accountType.valid && accountForm.accountType.validation && accountForm.accountType.touched) {
        typeError = (<em>{accountForm.accountType.errorMessage}</em>);
    }
    let ownerError = null;
    if (!accountForm.ownerId.valid && accountForm.ownerId.validation && accountForm.ownerId.touched) {
        ownerError = (<em>{accountForm.ownerId.errorMessage}</em>);
    }

    const updateAccount = (event) => {
        event.preventDefault();

        const accountToUpdate = {
            accountType: account.accountType,
            dateCreated: account.dateCreated,
            ownerId: account.ownerId,
            id: account.id
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
    // const handleDateChange = e => {
    //     dispatch({ type: 'UPDATE_USER_TO_UPDATE', data: { ...account, dateOfBirth: e } })
    // }

    const redirectToAccountList = () => {
        props.history.push('/account-list');
    }

    const accountT=()=>{
        if (account.accountType == "Domestic")
        {
            return ("Foreign")
        } else 
            return ("Domestic")
    }

    console.log(accountForm);
    console.log(account);
    // console.log(ownerInfo);

    return (
        <div>
            {
                accountOwner && (
                    <Well>
                        <Form horizontal
                        onSubmit={updateAccount}
                        >
                            <FormGroup controlId='accountType'>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Account Type:
                    </Col>
                                <Col sm={6}>
                                    <FormControl
                                        name='accountType'
                                        type='select'
                                        componentClass='select'
                                        value={account.accountType}
                                        onChange=
                                        {e => handleChange(e, 'accountType')}
                                        onBlur=
                                        {e => handleChange(e, 'accountType')}
                                    >
                                        <option value={account.accountType} selected>{account.accountType}</option>
                                        <option value={accountT()}>{accountT()}</option>
                                    </FormControl>
                                </Col>
                                <Col>
                                    <em>{typeError}</em>
                                </Col>
                            </FormGroup>
                            <br />
                            <FormGroup controlId='ownerId'>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Owner:
                    </Col>
                                <Col sm={6}>
                                    <FormControl
                                        name='ownerId'
                                        type='select'
                                        componentClass='select'
                                        onChange=
                                        {e => handleChange(e, 'ownerId')}
                                        onBlur=
                                        {e => handleChange(e, 'ownerId')}
                                    >
                                        <option value={accountOwner[0].id} selected>{accountOwner[0].name}</option>

                                        {newArr3.map(ow =>
                                            <option value={ow.id}>{ow.name}</option>
                                        )}
                                    </FormControl>
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
        </div>
    )
}

export default UpdateAccount;