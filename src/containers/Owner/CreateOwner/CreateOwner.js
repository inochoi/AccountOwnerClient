import React, { useState, useEffect } from 'react';
import Input from '../../../UI/Inputs/Input';
import { Form, Well, Button, FormGroup, Col } from 'react-bootstrap';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import { useSelector, useDispatch } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';

const CreateOwner = (props) => {
    const [ownerForm, setOwnerForm] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    const dispatch = useDispatch();

    
    useEffect(() => {
        setOwnerForm(returnInputConfiguration());
    }, []);

    const formElementsArray = FormUtilityActions.convertStateToArrayOfFormObjects({ ...ownerForm });

    const createOwner = (event) => {
        event.preventDefault();

        const ownerToCreate = {
            name: ownerForm.name.value,
            address: ownerForm.address.value,
            dateOfBirth: ownerForm.dateOfBirth.value
        }

        const url = '/api/owner';
        dispatch(repositoryActions.postData(url, ownerToCreate, { ...props }))
    }

    const handleChangeEvent = (event, id) => {
        const updatedOwnerForm = { ...ownerForm };
        updatedOwnerForm[id] =
            FormUtilityActions.executeValidationAndReturnFormElement(event, updatedOwnerForm, id);
        const counter = FormUtilityActions.countInvalidElements(updatedOwnerForm);
        setOwnerForm(updatedOwnerForm);
        setIsFormValid(counter === 0);
    }

    const redirectToOwnerList = () => {
        props.history.push('/owner-list');
    }

    return (
        <Well>
            <Form horizontal onSubmit={createOwner}>
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
                        <Button bsStyle='danger' onClick={redirectToOwnerList}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
            <SuccessModal show={showSuccessModal}
                modalHeaderText={'Success message'}
                modalBodyText={'Action completed successfully'}
                okButtonText={'OK'}
                successClick={() => dispatch(repositoryActions.closeSuccessModal({ ...props }, '/owner-List'))} />
            <ErrorModal show={showErrorModal}
                modalHeaderText={'Error message'}
                modalBodyText={errorMessage}
                okButtonText={'OK'} closeModal={() => dispatch(errorHandlerActions.closeErrorModal())} />
        </Well>
    )
}
export default CreateOwner;