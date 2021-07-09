import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FormInput from '../components/form-input';
import SubmitButton from '../components/submit-button';
import { login } from '../redux/session/session.actions';
import { setInProgress } from '../redux/item/item.actions';

const SignIn = ({ history, login, setInProgress }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setInProgress(true);
    login(username, password, history, setInProgress);
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  return (
    <div className="sign-in-up__container">
      <div className="sign-in-up__card">
        <h2 className="sign-in-up__card-title">Sign In</h2>
        <span className="sign-in-up__card-subtitle">Enter your username and password</span>

        <form className="sign-in-up__card-form" onSubmit={handleSubmit}>
          <FormInput
            id="username"
            name="username"
            type="username"
            handleChange={handleUsernameChange}
            value={username}
            placeholder="username"
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            value={password}
            handleChange={handlePasswordChange}
            placeholder="password"
          />
          <div>
            <SubmitButton> Sign in </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
  setInProgress: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (username, password, history, setInProgress) => dispatch(login(username, password,
    history, setInProgress)),
  setInProgress: (inProgress) => dispatch(setInProgress(inProgress)),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignIn));
