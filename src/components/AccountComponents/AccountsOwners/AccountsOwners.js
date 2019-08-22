import React from 'react';
import {Row,Col,Table} from 'react-bootstrap';
import Moment from 'react-moment';

const AccountsOwners = (props) => {
    let owners = null;
    if (props.owners){
        owners = props.owners.map(owner =>{
            return (
                <tr key={owner.id}>
                    <td>{owner.name}</td>
                    <td><Moment format='MM/DD/YYYY'>{owner.dateOfBirth}</Moment></td>
                    <td>{owner.address}</td>
                </tr>
            )
        })
    }
    return ( 
        <Row>
            <Col>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of birth</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {owners}
                </tbody>
            </Table>
            </Col>
        </Row>
     );
}
 
export default AccountsOwners;