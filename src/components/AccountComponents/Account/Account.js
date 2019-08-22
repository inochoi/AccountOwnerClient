import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';

const Account = (props) => {

    const redirectToAccountDetails = (id, history) => {
        history.push('/accountDetails/' + id);
    }

    const redirectToUpdateAccount = (id, history) => {
        history.push('/updateAccount/' + id);
    }

    const redirectToDeleteAccount = (id, history) => {
        history.push('/deleteAccount/' + id);
    }

    return ( 
        <Fragment>
            <tr>
                <td>{props.account.id}</td>
                <td><Moment format='MM/DD/YYYY'>{props.account.dateCreated}</Moment></td>
                <td>{props.account.accountType}</td>
                <td>
                    <Button onClick={() => redirectToAccountDetails(props.account.id, props.history)}>Details</Button>
                </td>
                <td>
                    <Button bsStyle='success' onClick={() => redirectToUpdateAccount(props.account.id, props.history)}>Update</Button>
                </td>
                <td>
                    <Button bsStyle='danger' onClick={() => redirectToDeleteAccount(props.account.id, props.history)}>Delete</Button>
                </td>
            </tr>
        </Fragment>
     );
}

export default Account;