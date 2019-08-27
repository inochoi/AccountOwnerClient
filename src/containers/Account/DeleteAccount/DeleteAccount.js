import React, { Fragment, useEffect } from 'react';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import * as errorHandlerActions from '../../../store/actions/errorHandlerActions';
import { useSelector, useDispatch } from 'react-redux';
import { Well, Button, Col, Row, ControlLabel } from 'react-bootstrap';
import Moment from 'react-moment';
import SuccessModal from '../../../Modals/SuccessModal/SuccessModal';
import ErrorModal from '../../../Modals/ErrorModal/ErrorModal';

const DeleteAccount = (props) => {

    const data = useSelector(state => state.repository.data);
    const showSuccessModal = useSelector(state => state.repository.showSuccessModal);
    const showErrorModal = useSelector(state => state.errorHandler.showErrorModal);
    const errorMessage = useSelector(state => state.errorHandler.errorMessage);
    const dispatch = useDispatch();

    let account = { ...data };

    const deleteAccount = (event) => {
        event.preventDefault();
        const url = "/api/account/" + data.id;
        dispatch(repositoryActions.deleteData(url, { ...props }));
    }

    const redirectToAccountList = () => {
        props.history.push('/account-List');
    }

    useEffect(() => {
        const id = props.match.params.id;
        const url = '/api/account/' + id;
        dispatch(repositoryActions.getData(url, { ...props }));
    }, [dispatch, props]);

    return (
        <Fragment>
            <Well>
                <Row>
                    <Col md={3}>
                        <ControlLabel htmlFor='name'>Account Id:</ControlLabel>
                    </Col>
                    <Col md={7}>
                        <span name='id'>{account.id}</span>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <ControlLabel htmlFor='dateOfBirth'>Date Created:</ControlLabel>
                    </Col>
                    <Col md={7}>
                        <span name='dateCreated'><Moment format="MM/DD/YYYY">
                            {account.dateCreated}</Moment></span>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <ControlLabel htmlFor='accountType'>Account Type:</ControlLabel>
                    </Col>
                    <Col md={7}>
                        <span name='accountType'>{account.accountType}</span>
                    </Col>
                </Row>
            </Well>

            <Row>
                <Col mdOffset={8} md={1}>
                    <Button type="submit" bsStyle="info" onClick={deleteAccount}>Delete</Button>
                </Col>
                <Col md={1}>
                    <Button bsStyle='danger' onClick={redirectToAccountList}>Cancel</Button>
                </Col>
            </Row>

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
        </Fragment>
    );
}

export default DeleteAccount;