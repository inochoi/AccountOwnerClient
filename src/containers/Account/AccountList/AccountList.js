import React, { Fragment, useEffect } from 'react';
import { Table, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';
import Account from '../../../components/AccountComponents/Account/Account';

const AccountList = (props) => {
    let accounts = [];

    const data = useSelector(state => state.repository.data);

    if (data && data.length > 0){
        accounts = data.map(account => {
            return (
                <Account key={account.id} account={account} { ...props } />
            )
        })
    }

    const dispatch = useDispatch();

    useEffect(() => {
        let url = '/api/account';
        dispatch(repositoryActions.getData(url, {...props}));
    }, [dispatch, props]);

    return ( 
        <Fragment>
            <Row>
                <Col mdOffset={10} md={2}>
                    <Link to='/createAccount'>Create Account</Link>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md ={12}>
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>Account ID</th>
                                <th>Date Created</th>
                                <th>Account Type</th>
                                <th>Details</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Fragment>
     );
}
 
export default AccountList;