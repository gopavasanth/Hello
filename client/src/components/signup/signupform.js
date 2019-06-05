import React from 'react';
import { Tooltip, Button, Card, FormGroup, InputGroup, Callout } from '@blueprintjs/core';
import { Row, Col } from 'react-grid';

import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import dataFetch from '../../utils/dataFetch';

const cookies = new Cookies();

const query = `
mutation createuser($email: String!, $password: String!, $confirm: String!,$username: String!, $firstname: String!, $lastname: String! ) {
    createUser(email: $email, password: $password, confirm: $confirm, username: $username, firstname: $firstname , lastname:$lastname ) {
      token
      username
      firstname
      lastname
    }
} `;

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm: '',
      firstname: '',
      lastname: '',
      username: '',
      showPassword: false,
      cookieSet: false,
      authFail: false,
    };
    this.firstnameEntry = this.firstnameEntry.bind(this);
    this.lastnameEntry = this.lastnameEntry.bind(this);
    this.usernameEntry = this.usernameEntry.bind(this);
    this.confirmEntry = this.confirmEntry.bind(this);
    this.passwordEntry = this.passwordEntry.bind(this);
    this.emailEntry = this.emailEntry.bind(this);
    this.handleLockClick = this.handleLockClick.bind(this);
  }

  signup = async () => {
    const variables = {
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirm,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
    };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      cookies.set('token', response.data.createUser.token, { path: '/' });
      this.setState({ cookieSet: true });
    } else {
      this.setState({ authFail: true });
    }
  };

  usernameEntry(event) {
    this.setState({ username: event.target.value });
  }

  firstnameEntry(event) {
    this.setState({ firstname: event.target.value });
  }

  lastnameEntry(event) {
    this.setState({ lastname: event.target.value });
  }

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
          <Row>
            <Col>
              <FormGroup label="firstname" labelFor="text-input">
                <InputGroup onChange={this.firstnameEntry} placeholder="Enter your FirstName" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup label="lastname" labelFor="text-input">
                <InputGroup onChange={this.lastnameEntry} placeholder="Enter your LastName" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup label="email" labelFor="text-input">
            <InputGroup onChange={this.emailEntry} placeholder="Enter your email" />
          </FormGroup>
          <FormGroup label="username" labelFor="text-input">
            <InputGroup onChange={this.usernameEntry} placeholder="Enter your username" />
          </FormGroup>
          <Row>
            <Col>
              <FormGroup label="Password" labelFor="text-input">
                <InputGroup
                  placeholder="Enter your password"
                  onChange={this.passwordEntry}
                  rightElement={lockButton}
                  type={this.state.showPassword ? 'text' : 'password'}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup label="Confirm Password" labelFor="text-input">
                <InputGroup
                  placeholder="Enter your password"
                  onChange={this.passwordEntry}
                  rightElement={lockButton}
                  type={this.state.showPassword ? 'text' : 'password'}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit" intent="primary" text="Sign Up" />
        </form>
      </Card>
    );
  }
}

export default SignUpForm;
