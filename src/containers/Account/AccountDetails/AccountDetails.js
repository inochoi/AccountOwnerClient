import React, {Fragment, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Well, Row, Col} from 'react-bootstrap';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import Moment from 'react-moment';
import AccountsOwners from '../../../components/AccountComponents/AccountsOwners/AccountsOwners';

const AccountDetails = (props) => {

    const account = useSelector(state => state.repository.data);

    const dispatch = useDispatch();

    useEffect(()=>{
        let id = props.match.params.id;
        let url = '/api/account/' + id + '/owner';
        dispatch(repositoryActions.getData(url, {...props}));
    }, [props, dispatch])

    return ( 
        <Fragment>
            <Well>
                <Row>
                    <Col md={3}>
                        <strong> Account Id:</strong>
                    </Col>
                    <Col md={3}>
                        {account.id}
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong> Date created:</strong>
                    </Col>
                    <Col md={3}>
                    <Moment format="MM/DD/YYYY">{account.dateCreated}</Moment>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <strong> Account type:</strong>
                    </Col>
                    <Col md={3}>
                        {account.accountType}
                    </Col>
                </Row>
            </Well>
            <AccountsOwners owners={account.owners} />
        </Fragment>
     );
}
 
export default AccountDetails;