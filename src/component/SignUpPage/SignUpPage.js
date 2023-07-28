import userImage from '../../assets/img/logo.png';
import Input from '../common/Input';
import Terms from '../common/Terms';
import PasswordInput from '../common/PasswordInput';
import { Link } from 'react-router-dom';

const SignUpPage = ({ formik, handleSubmit }) => {
  return (
    <div className="signUpForm">
      <div className="logo">
        <img src={userImage} alt="logo" />
      </div>

      <form className="formStyle" onSubmit={handleSubmit}>
        <h2>Get Started Now</h2>
        <Input
          formik={formik}
          name="name"
          placeholder="Enter your name"
          label="Name"
        />
        <Input
          formik={formik}
          name="email"
          placeholder="Enter your email"
          label="Email address"
        />
        <PasswordInput
          formik={formik}
          name="password"
          placeholder="Enter your password"
          label="Password"
          type="password"
        />
        <PasswordInput
          formik={formik}
          name="passwordConfirm"
          placeholder="Enter your password"
          label="Confirm Password"
          type="password"
        />
        <Terms
          formik={formik}
          name="terms"
          label="I agree to the terms & policy"
        />
        <button className="formControl" type="submit">
          {/* The button is always enabled */}
          <span>Signup</span>
        </button>
        <Link to="/login" className="login">
          Have you account?
          <span>Login</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
