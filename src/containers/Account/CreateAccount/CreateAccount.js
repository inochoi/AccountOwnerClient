import React, { useState, useEffect } from 'react';
import Input from '../../../UI/Inputs/Input';
import { Form, Well, Button, FormGroup, Col } from 'react-bootstrap';
import { returnAccountInputConfiguration } from '../../../Utility/AccountInputConfiguration';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import { useSelector, useDispatch } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';
import moment from 'moment';

const CreateAccount = (props) => {
    const [accountForm, setAccountForm] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    const dispatch = useDispatch();

    useEffect(() => {
        setAccountForm(returnAccountInputConfiguration());
    }, []);

    const formElementsArray = FormUtilityActions.convertStateToArrayOfFormObjects({ ...accountForm });

    const createAccount = (event) => {
        event.preventDefault();

        const accountToCreate = {
            accountType: accountForm.accountType.value,
            dateCreated: moment().format('MM/DD/YYYY'),
            ownerId: accountForm.owner.value
        }

        const url = '/api/account';
        dispatch(repositoryActions.postData(url, accountToCreate, { ...props }))
    }

    const handleChangeEvent = (event, id) => {
        const updateAccountForm = { ...accountForm };
        updateAccountForm[id] =
            FormUtilityActions.executeValidationAndReturnFormElement(event, updateAccountForm, id);
        const counter = FormUtilityActions.countInvalidElements(updateAccountForm);
        setAccountForm(updateAccountForm);
        setIsFormValid(counter === 0);
    }

    const redirectToAccountList = () => {
        props.history.push('/account-list');
    }

    return (
        <Well>
            <Form horizontal onSubmit={createAccount}>
                {
                    formElementsArray.map(element => {
                        return <Input key={element.id} elementType=
                            {element.config.element}
                            id={element.id} label={element.config.label}
                            type={element.config.type} value={element.config.value}
                            changed={(event) => handleChangeEvent(event, element.id)}
                            errorMessage={element.config.errorMessage}
                            invalid={!element.config.valid} shouldValidate=
                            {element.config.validation}
                            touched={element.config.touched}
                            blur={(event) => handleChangeEvent(event, element.id)} />
                    })
                }
                <br />
                <FormGroup>
                    <Col mdOffset={6} md={1}>
                        <Button type='submit' bsStyle='info' disabled=
                            {!isFormValid}>Create</Button>
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
                okButtonText={'OK'} closeModal={() => dispatch(errorHandlerActions.closeErrorModal())} />
        </Well>
    )
}
export default CreateAccount;