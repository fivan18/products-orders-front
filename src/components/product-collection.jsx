import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

const ProductCollection = ({ products }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {products.map(({
        id, attributes: {
          name, price,
        },
      }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{price}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const {
  shape, string, arrayOf, number,
} = PropTypes;

ProductCollection.propTypes = {
  products: arrayOf(
    shape({
      id: string,
      attributes: shape({
        name: string,
        price: number,
      }),
    }),
  ).isRequired,
};

export default ProductCollection;
