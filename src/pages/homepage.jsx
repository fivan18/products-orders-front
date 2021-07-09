import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';

import { apiUrl } from '../utilities/utils';
import { logout } from '../redux/session/session.actions';

const Homepage = ({ history, logout }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [mostSaleProducts, setMostSaleProducts] = useState([]);
  const [ordersPerMonth, setOrdersPerMonth] = useState([]);

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
              most_sale_products: mostSaleProducst,
              orders_per_month: ordersPerMonth,
            },
          }) => {
            if (mounted) {
              setUsers(users);
              setProducts(products);
              setOrders(orders);
              setMostSaleProducts(mostSaleProducst);
              setOrdersPerMonth(ordersPerMonth.map(({ quantity, month, year }) => ({
                quantity,
                month: `${month}-${year}`,
              })));
            }
          })
          .catch(() => {
            if (mounted) {
              console.log('logout');
              logout(history);
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
    <div style={{ marginTop: '3rem' }}>
      <Container>
        <Row>
          <Col lg={4}>
            <Jumbotron>
              <h2>Latest Users</h2>
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
          <Col lg={4}>
            <Jumbotron>
              <h2>Latest Products</h2>
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
          <Col lg={4}>
            <Jumbotron>
              <h2>Latest Orders</h2>
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
          <Col lg={6}>
            <h2>Most-Sale Products</h2>
            <div style={{ height: '30rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={mostSaleProducts}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col lg={6}>
            <h2>Orders per Month</h2>
            <div style={{ height: '30rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={ordersPerMonth}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
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
  logout: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: (history) => dispatch(logout(history)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Homepage));
