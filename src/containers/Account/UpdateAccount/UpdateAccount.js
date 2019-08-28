import React, { useState } from 'react';
import { Form, Well, Button, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { returnAccountUpdateInputConfiguration } from '../../../Utility/AccountUpdateInputConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';

const UpdateAccount = (props) => {
    const account = useSelector(state => state.repository.userToUpdate);
    const accountOwner = useSelector(state => state.repository.userToUpdate.owners);
    const owner = useSelector(state => state.repository.data);
    const [accountForm, setAccountForm] = useState(returnAccountUpdateInputConfiguration());
    const [isFormValid, setIsFormValid] = useState(true);
    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    const dispatch = useDispatch();

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

    const redirectToAccountList = () => {
        props.history.push('/account-list');
    }

    const accountT = () => {
        if (account.accountType === "Domestic") {
            return ("Foreign")
        } else
            return ("Domestic")
    }

    const setSelected = (id) => {
        if (id === account.owners[0].id) {
            return 'selected';
        }
        else return null;
    }

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
                                    >
                                        <option value={accountForm.accountType.value} selected>{account.accountType}</option>
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
                                        value={account.ownerId}
                                        onChange=
                                        {e => handleChange(e, 'ownerId')}
                                    >
                                        {owner.map(ow =>
                                            <option value={ow.id} {...setSelected(ow.id)}>{ow.name}</option>
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