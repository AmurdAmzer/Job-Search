require('jsdom-global')();
require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const React = require('react');
const { render, screen, fireEvent } = require('@testing-library/react');
const { expect } = require('chai');
const Login = require('../pages/login');

describe('Login Page', () => {
  it('renders email and password input fields', () => {
    render(React.createElement(Login));

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    expect(email).to.exist;
    expect(password).to.exist;
  });

  it('lets user type into email and password', () => {
    render(React.createElement(Login));

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'test@user.com' } });
    fireEvent.change(password, { target: { value: 'mypassword' } });

    expect(email.value).to.equal('test@user.com');
    expect(password.value).to.equal('mypassword');
  });

  it('renders login button', () => {
    render(React.createElement(Login));
    const button = screen.getByTestId('submit-button');
    expect(button).to.exist;
  });
});
