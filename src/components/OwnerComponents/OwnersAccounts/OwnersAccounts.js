import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import Moment from 'react-moment';

const OwnersAccounts = (props) => {
    let accounts = null;
    if (props.accounts) {
        accounts = props.accounts.map(account => {
            return (
                <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.accountType}</td>
                    <td><Moment format="MM/DD/YYYY">{account.dateCreated}</Moment></td>
                </tr>
            );
        })
    }
    return (
        <Row>
            <Col md={12}>
                <Table responsive striped>
                    <thead>
                        <tr>
                            <th>Account id</th>
                            <th>Account type</th>
                            <th>Date created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts}
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}
export default OwnersAccounts;