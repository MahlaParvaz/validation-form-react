// import React, { useEffect, useState } from 'react';
import Input from '../common/Input';
import Terms from '../common/Terms';
import PasswordInput from '../common/PasswordInput';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = ({ formikLogin, handleSubmit }) => {
  const history = useHistory();
  const onClick = (event) => {
    event.preventDefault();
    // event.target.reset();
    history.push('/');
  };

  const handleLoginClick = () => {
    const isLoginSuccessful = true;
    if (isLoginSuccessful) {
      toast.success('Login Successful', { autoClose: 3000 });
    } else {
      toast.error('Login Failed');
    }
  };
  return (
    <div className="signUpForm">
      <div className="logo">
        <img src="/img/logo.png" alt="logo" />
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
        <button
          className="formControl"
          type="submit"
          onClick={handleLoginClick}
        >
          {' '}
          {/* The button is always enabled */}
          <span>Login</span>
        </button>
        <Link to="/" onClick={onClick} className="signup">
          Don't have an account?
          <span>Sign Up</span>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
