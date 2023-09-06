// import React, { useEffect, useState } from 'react';
import userImage from '../../assets/img/logo.png';
import Input from '../common/Input';
import Terms from '../common/Terms';
import PasswordInput from '../common/PasswordInput';
import { Link, useHistory } from 'react-router-dom';
const LoginPage = ({ formikLogin, handleSubmit }) => {
  const history = useHistory();
  const onClick = (event) => {
    event.preventDefault();
    // event.target.reset();
    history.push('/');
  };
  return (
    <div className="signUpForm">
      <div className="logo">
        <img src={userImage} alt="logo" />
      </div>

      <form className="formStyle" onSubmit={handleSubmit}>
        <div className="title">
          <h2>Welcome back!</h2>
          <span>Enter your Credentials to access your account</span>
        </div>

        <Input
          formik={formikLogin}
          name="email"
          placeholder="Enter your email"
          label="Email address"
        />
        <PasswordInput
          formik={formikLogin}
          name="password"
          placeholder="Enter your password"
          label="Password"
          type="password"
        />

        <Terms formik={formikLogin} name="terms" label="Remember for 30 days" />
        <button className="formControl" type="submit">
          {' '}
          {/* The button is always enabled */}
          <span>Login</span>
        </button>
        <Link to="/" onClick={onClick} className="signup">
          Don't have an account?
          <span>Sign Up</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
