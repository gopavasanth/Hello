import React from 'react';
import { Tooltip, Button, Card, FormGroup, InputGroup, Callout } from '@blueprintjs/core';

import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import dataFetch from '../../utils/dataFetch';

const cookies = new Cookies();

const query = `
mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
}`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      cookieSet: false,
      authFail: false,
    };
    this.passwordEntry = this.passwordEntry.bind(this);
    this.emailEntry = this.emailEntry.bind(this);
    this.handleLockClick = this.handleLockClick.bind(this);
  }

  login = async () => {
    const variables = { email: this.state.email, password: this.state.password };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      cookies.set('token', response.data.tokenAuth.token, { path: '/' });
      this.setState({ cookieSet: true });
    } else {
      this.setState({ authFail: true });
    }
  };

  passwordEntry(event) {
    this.setState({ password: event.target.value });
  }

  emailEntry(event) {
    this.setState({ email: event.target.value });
  }

  handleLockClick() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    if (this.state.cookieSet) return <Redirect to="/" />;

    const lockButton = (
      <Tooltip content={`${this.state.showPassword ? 'Hide' : 'Show'} Password`}>
        <Button
          icon={this.state.showPassword ? 'unlock' : 'lock'}
          intent="warning"
          minimal
          onClick={this.handleLockClick}
        />
      </Tooltip>
    );

    const errorMessage = (
      <div style={{ padding: '1rem 0rem' }}>
        <Callout intent="danger">Please provide a valid email and password.</Callout>
      </div>
    );

    return (
      <Card elevation="2" className="login-card">
        <h1>Login</h1>
        {this.state.authFail ? errorMessage : null}
        <form
          onSubmit={e => {
            this.login();
            e.preventDefault();
          }}
        >
          <FormGroup label="email" labelFor="text-input" labelInfo="(required)">
            <InputGroup onChange={this.emailEntry} placeholder="Enter your email" />
          </FormGroup>
          <FormGroup label="Password" labelFor="text-input" labelInfo="(required)">
            <InputGroup
              placeholder="Enter your password"
              onChange={this.passwordEntry}
              rightElement={lockButton}
              type={this.state.showPassword ? 'text' : 'password'}
            />
          </FormGroup>
          <Button type="submit" intent="primary" text="Login" />
        </form>
      </Card>
    );
  }
}

export default LoginForm;
