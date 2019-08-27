import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as repositoryActions from '../../store/actions/repositoryActions';
import 'react-datepicker/dist/react-datepicker.css';
import './Input.css';

const Input = (props) => {
    let inputField = null;
    let errorMessage = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        errorMessage = (<em>{props.errorMessage}</em>);
    }

    const owner = useSelector(state => state.repository.data);

    const dispatch = useDispatch();

    useEffect(() => {
        let url = '/api/owner/';
        dispatch(repositoryActions.getData(url, { ...props }));
    }, [props, dispatch])

    switch (props.elementType) {
        case 'input':
            inputField = (
                <FormGroup controlId={props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={6}>
                        <FormControl type={props.type} value={props.value} onChange=
                            {props.changed} onBlur={props.blur} />
                    </Col>
                    <Col>
                        <em>{errorMessage}</em>
                    </Col>
                </FormGroup>
            )
            break;
        case 'datePicker':
            inputField = (
                <FormGroup controlId={props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={6}>
                        <DatePicker selected={props.value} dateFormat="MM/DD/YYYY"
                            readOnly
                            onChange={props.changed} className='datePickerControl'
                            showYearDropdown dropdownMode="select" />
                    </Col>
                    <Col>
                        <em>{errorMessage}</em>
                    </Col>
                </FormGroup>
            )
            break;
        case 'accountTypeSelect':
            inputField = (
                <FormGroup controlId={props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={6}>
                        <FormControl componentClass={props.type} placeholder="select" onChange=
                            {props.changed} onBlur={props.blur}>
                            <option value="" disabled selected>select user type</option>
                            <option value="Domestic">Domestic</option>
                            <option value="Foreign">Foreign</option>
                        </FormControl>
                    </Col>
                    <Col>
                        <em>{errorMessage}</em>
                    </Col>
                </FormGroup>
            )
            break;
        case 'ownerSelect':
            inputField = (
                <FormGroup controlId={props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {props.label}
                    </Col>
                    <Col sm={6}>
                        <FormControl componentClass={props.type} placeholder="select" onChange=
                            {props.changed} onBlur={props.blur}>
                            <option value="" disabled selected>select owner</option>

                            {owner.map(ow =>
                                <option value={ow.id}>{ow.name}</option>
                            )}
                        </FormControl>
                    </Col>
                    <Col>
                        <em>{errorMessage}</em>
                    </Col>
                </FormGroup>
            )
            break;
        default: inputField = null;
    }
    return (
        <Fragment>
            {inputField}
        </Fragment>
    )
}
export default Input;