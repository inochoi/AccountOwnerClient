import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as repositoryActions from '../../../store/actions/repositoryActions';


const redirectToOwnerDetails = (id, history) => {
    history.push('/ownerDetails/' + id);
}
const redirectToUpdateOwner = (id, history) => {
    history.push('/updateOwner/' + id);
}
const redirectToDeleteOwner = (id, history) => {
    history.push('/deleteOwner/' + id);
}
const Owner = (props) => {
    const dispatch = useDispatch();

    const editUser = (id) => {
        let url = 'api/owner/' + id;
        dispatch(repositoryActions.edit(url, { ...props }))
    }

    const myFunction = (id, history) => {
        redirectToUpdateOwner(id, history);
        editUser(id);
    }

    return (
        <Fragment>
            <tr>
                <td>{props.owner.name}</td>
                <td><Moment format="MM/DD/YYYY">{props.owner.dateOfBirth}</Moment></td>
                <td>{props.owner.address}</td>
                <td>
                    <Button onClick={() => redirectToOwnerDetails(props.owner.id, props.history)}>Details</Button>
                </td>
                <td>
                    <Button bsStyle="success" onClick={() => myFunction(props.owner.id, props.history)}>Update</Button>
                </td>
                <td>
                    <Button bsStyle="danger" onClick={() => redirectToDeleteOwner(props.owner.id, props.history)}>Delete</Button>
                </td>
            </tr>
        </Fragment>
    )
}
export default Owner;