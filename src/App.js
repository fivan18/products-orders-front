import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage';
import SignIn from './pages/sign-in';
import NotFound from './pages/not-found';
import Pagination from './pages/pagination';

import Header from './layout/header';
import Progress from './layout/progress';

import PrivateRoute from './utilities/private-route';

import { selectChecked, selectAuthenticated } from './redux/session/session.selectors';

const App = ({ authenticated, checked }) => (
  <div className="app">
    <Header />
    <Progress />
    { checked
          && (
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} authenticated={authenticated} />
            <PrivateRoute path="/pagination/:itemsType" component={Pagination} authenticated={authenticated} />
            <Route path="/signin" component={SignIn} />
            <Route path="/*" component={NotFound} />
          </Switch>
          )}
  </div>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authenticated: selectAuthenticated,
  checked: selectChecked,
});

export default connect(
  mapStateToProps,
  null,
)(App);
