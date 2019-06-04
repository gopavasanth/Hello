import React from 'react';
import { Button, Card, FormGroup, InputGroup, Callout } from '@blueprintjs/core';

import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import dataFetch from '../../utils/dataFetch';

const cookies = new Cookies();

const query = `
mutation createuser($email: String!, $password: String!, $confirm: String!) {
    createUser(email: $email, password: $password, confirm: $confirm) {
      token
    }
} `;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      showPassword: false,
      cookieSet: false,
      authFail: false,
    };
    this.confirmEntry = this.confirmEntry.bind(this);
    this.passwordEntry = this.passwordEntry.bind(this);
    this.emailEntry = this.emailEntry.bind(this);
    this.handleLockClick = this.handleLockClick.bind(this);
  }

  signup = async () => {
    const variables = { email: this.state.email, password: this.state.password, confirm: this.state.confirm };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      cookies.set('token', response.data.createUser.token, { path: '/' });
      this.setState({ cookieSet: true });
    } else {
      this.setState({ authFail: true });
    }
  };

  confirmEntry(event) {
    this.setState({ confirm: event.target.value });
  }

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

    const errorMessage = (
      <div style={{ padding: '1rem 0rem' }}>
        <Callout intent="danger">User already exists.</Callout>
      </div>
    );

    return (
      <Card elevation="2" className="signup-card">
        <h1>Sign Up</h1>
        {this.state.authFail ? errorMessage : null}
        <form
          onSubmit={e => {
            this.signup();
            e.preventDefault();
          }}
        >
          <FormGroup label="email" labelFor="text-input" labelInfo="(required)">
            <InputGroup onChange={this.emailEntry} placeholder="Enter your email" />
          </FormGroup>
          <FormGroup label="Password" labelFor="text-input" labelInfo="(required)">
            <InputGroup placeholder="Enter your password" onChange={this.passwordEntry} />
          </FormGroup>
          <FormGroup label="Confirm Password" labelFor="text-input" labelInfo="(required)">
            <InputGroup placeholder="Enter your confirm password" onChange={this.confirmEntry} />
          </FormGroup>
          <Button type="submit" intent="primary" text="Sign Up" />
        </form>
      </Card>
    );
  }
}

export default SignUpForm;
