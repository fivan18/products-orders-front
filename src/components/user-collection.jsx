import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

const UserCollection = ({ users }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Initials</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {users.map(({
        id, attributes: {
          first_name: firstName, last_name: lastName, initials, email,
        },
      }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{initials}</td>
          <td>{email}</td>
        </tr>
      ))}

    </tbody>
  </Table>
);

const {
  shape, string, arrayOf,
} = PropTypes;

UserCollection.propTypes = {
  users: arrayOf(
    shape({
      id: string,
      attributes: shape({
        first_name: string,
        last_name: string,
        initials: string,
        email: string,
      }),
    }),
  ).isRequired,
};

export default UserCollection;
