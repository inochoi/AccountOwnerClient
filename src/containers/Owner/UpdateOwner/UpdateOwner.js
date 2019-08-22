import React, { useState, useEffect } from 'react';
import { Form, Well, Button, FormGroup, Col } from 'react-bootstrap';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import Input from '../../../UI/Inputs/Input';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import moment from 'moment';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';


const UpdateOwner = (props) => {
    const [ownerForm, setOwnerForm] = useState({});
    const [isFormValid, setIsFormValid] = useState(true);

    const owner = useSelector(state => state.repository.data);
    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    const dispatch = useDispatch();

    
    useEffect(() => {
        const handleOwnerForm = () =>{
            setOwnerForm(returnInputConfiguration());
        }
        handleOwnerForm();
        },[]);
    
    console.log(ownerForm)
    useEffect(() => {
        let id = props.match.params.id;
        let url = '/api/owner/' + id + '/account';
        dispatch(repositoryActions.getData(url, { ...props }));
    }, [props, dispatch]);

    const formElementsArray = FormUtilityActions.convertStateToArrayOfFormObjects({ ...ownerForm });

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

    const updateOwner = (event) => {
        event.preventDefault();

        const ownerToUpdate = {
            name: ownerForm.name.value,
            address: ownerForm.address.value,
            dateOfBirth: ownerForm.dateOfBirth.value
        }
        const url = '/api/owner' + props.data.id;
        dispatch(repositoryActions.putData(url, ownerToUpdate, { ...props }))
    }

    return (
        <Well>
            <Form horizontal
            onSubmit={updateOwner}
            >
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
                            {!isFormValid}>Update</Button>
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
    );
}

export default UpdateOwner;