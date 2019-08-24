import React, { useState } from 'react';
import { Form, Well, Button, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import { returnInputConfiguration } from '../../../Utility/InputConfiguration';
import { useSelector, useDispatch } from 'react-redux';
import * as FormUtilityActions from '../../../Utility/FormUtilityActions';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import moment from 'moment';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateOwner = (props) => {
    const owner = useSelector(state => state.repository.userToUpdate);

    const [ownerForm, setOwnerForm] = useState(returnInputConfiguration());
    const [isFormValid, setIsFormValid] = useState(true);

    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);

    const dispatch = useDispatch();

    let nameError = null;
    if (!ownerForm.name.valid && ownerForm.name.validation && ownerForm.name.touched) {
        nameError = (<em>{ownerForm.name.errorMessage}</em>);
    }
    let addressError = null;
    if (!ownerForm.address.valid && ownerForm.address.validation && ownerForm.address.touched) {
        addressError = (<em>{ownerForm.address.errorMessage}</em>);
    }
    let dateOfBirthError = null;
    if (!ownerForm.dateOfBirth.valid && ownerForm.dateOfBirth.validation && ownerForm.dateOfBirth.touched) {
        dateOfBirthError = (<em>{ownerForm.dateOfBirth.errorMessage}</em>);
    }


    const updateOwner = (event) => {
        event.preventDefault();

        const ownerToUpdate = {
            name: owner.name,
            address: owner.address,
            dateOfBirth: owner.dateOfBirth.format("MM/DD/YYYY")
        }

        const url = '/api/owner/' + props.match.params.id;
        dispatch(repositoryActions.putData(url, ownerToUpdate, { ...props }))
    }


    const handleChange = (e, id) => {
        const updatedOwnerForm = { ...ownerForm };
        updatedOwnerForm[id] =
            FormUtilityActions.executeValidationAndReturnFormElement(e, updatedOwnerForm, id);
        const counter = FormUtilityActions.countInvalidElements(updatedOwnerForm);
        setOwnerForm(updatedOwnerForm);
        setIsFormValid(counter === 0);
        dispatch({ type: 'UPDATE_USER_TO_UPDATE', data: { ...owner, [e.target.name]: e.target.value } })
    }
    const handleDateChange = e => {
        dispatch({ type: 'UPDATE_USER_TO_UPDATE', data: { ...owner, dateOfBirth: e } })
    }

    const redirectToOwnerList = () => {
        props.history.push('/owner-list');
    }

    return (
        <Well>
            <Form horizontal onSubmit={updateOwner}>
                <FormGroup controlId='name'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Name:
                    </Col>
                    <Col sm={6}>
                        <FormControl
                            name='name'
                            type='text'
                            value={owner.name}
                            onChange=
                            {e => handleChange(e, 'name')}
                            onBlur=
                            {handleChange}
                        />
                    </Col>
                    <Col>
                        <em>{nameError}</em>
                    </Col>
                </FormGroup>
                <br />
                <FormGroup controlId='address'>
                    <Col componentClass={ControlLabel} sm={2}>
                        Address:
                    </Col>
                    <Col sm={6}>
                        <FormControl
                            name='address'
                            type='text'
                            value={owner.address}
                            onChange=
                            {e => handleChange(e, 'address')}
                            onBlur=
                            {handleChange}
                        />
                    </Col>
                    <Col>
                        <em>{addressError}</em>
                    </Col>
                </FormGroup>
                <br />
                <FormGroup controlId="dateOfBirth">
                    <Col componentClass={ControlLabel} sm={2}>
                        Date of birth:
                    </Col>
                    <Col sm={6}>
                        <DatePicker selected={moment(owner.dateOfBirth)} dateFormat="MM/DD/YYYY"
                            readOnly
                            onChange=
                            {handleDateChange}
                            className='datePickerControl'
                        />
                    </Col>
                    <Col>
                        <em>{dateOfBirthError}</em>
                    </Col>
                </FormGroup>
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
                okButtonText={'OK'}
                closeModal={() => dispatch(errorHandlerActions.closeErrorModal())} />
        </Well>
    )
}

export default UpdateOwner;