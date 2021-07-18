import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';

import { getTotal } from '../redux/item/item.utils';

const OrderCollection = ({ orders }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>User</th>
        <th>Products</th>
        <td>Quantities</td>
        <td>Prices</td>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(({
        id,
        attributes: {
          products, quantities,
        },
        relationships: { user: { meta: { first_name: firstName, last_name: lastName } } },
      }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{`${firstName} ${lastName}`}</td>
          <td>
            <ul>
              {products.map(({ id, name }) => (<li key={id}>{name}</li>))}
            </ul>
          </td>
          <td>
            <ul>
              {quantities.map(({
                product_id: productId,
                quantity,
              }) => (<li key={productId}>{quantity}</li>))}
            </ul>
          </td>
          <td>
            <ul>
              {products.map(({ id, price }) => (<li key={id}>{`$ ${price}`}</li>))}
            </ul>
          </td>
          <td>{`$ ${getTotal(products, quantities)}`}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const {
  shape, string, arrayOf, number,
} = PropTypes;

OrderCollection.propTypes = {
  orders: arrayOf(
    shape({
      id: string,
      attributes: shape({
        products: arrayOf(
          shape({
            id: number,
            name: string,
            price: number,
          }),
        ),
        quantities: arrayOf(
          shape({
            product_id: number,
            quantity: number,
          }),
        ),
      }),
      relationships: shape({
        user: shape({
          meta: shape({
            first_name: string,
            last_name: string,
          }),
        }),
      }),
    }),
  ).isRequired,
};

export default OrderCollection;
