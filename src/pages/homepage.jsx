import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';

import { apiUrl } from '../utilities/utils';

const Homepage = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [mostSaleProducts, setMostSaleProducts] = useState({});
  // const [ordersPerMonth, setOrdersPerMonth] = useState({});

  useEffect(() => {
    let mounted = true;

    sessionService.loadSession()
      .then(({ token }) => {
        axios({
          method: 'get',
          url: `${apiUrl}/dashboard/`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(({
            data: {
              users: { data: users },
              products: { data: products },
              orders: { data: orders },
              // most_sale_products: mostSaleProducst,
              // orders_per_month: ordersPerMonth,
            },
          }) => {
            if (mounted) {
              setUsers(users);
              setProducts(products);
              setOrders(orders);
              // setMostSaleProducts(mostSaleProducst);
              // setOrdersPerMonth(ordersPerMonth);
            }
          })
          .catch(() => {
            if (mounted) {
              history.push('/not-found');
            }
          });
      })
      .catch(() => {
        if (mounted) {
          history.push('/login');
        }
      });

    // eslint-disable-next-line no-return-assign
    return () => mounted = false;
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Latest Users</h1>
              <ListGroup>
                {users.map(({
                  id,
                  attributes: {
                    first_name: firstName,
                    last_name: lastName,
                  },
                }) => <ListGroup.Item key={id}>{`${firstName} ${lastName}`}</ListGroup.Item>)}
              </ListGroup>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron>
              <h1>Latest Products</h1>
              <ListGroup>
                {products.map(({
                  id,
                  attributes: {
                    name,
                  },
                }) => <ListGroup.Item key={id}>{name}</ListGroup.Item>)}
              </ListGroup>
            </Jumbotron>
          </Col>
          <Col>
            <Jumbotron>
              <h1>Latest Orders</h1>
              <ListGroup>
                {orders.map(({
                  id,
                  relationships: {
                    user: { meta: { first_name: firstName, last_name: lastName } },
                  },
                }) => <ListGroup.Item key={id}>{`Order ${id} by ${firstName} ${lastName}`}</ListGroup.Item>)}
              </ListGroup>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>

      </Container>
    </div>
  );
};

const { shape, func } = PropTypes;

Homepage.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default withRouter(Homepage);
