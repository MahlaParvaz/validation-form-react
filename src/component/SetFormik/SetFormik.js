import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginPage from '../LoginPage/LoginPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const onSubmit = async (values, verifyRecaptcha) => {
  const recaptchaResponse = await verifyRecaptcha(); // Call the function to verify reCAPTCHA v3
  if (recaptchaResponse) {
    console.log('reCAPTCHA v3 verified:', recaptchaResponse);
    console.log('Form values:', values);
    // You can now submit the form or perform other actions.
  } else {
    console.log('reCAPTCHA v3 verification failed.');
  }
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(6, 'Name length is not valid'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  passwordConfirm: Yup.string()
    .required('Password Confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

  terms: Yup.boolean()
    .required('The terms and conditions must be accepted')
    .oneOf([true], 'You need to accept the terms and conditions'),
});

const SetFormik = () => {
  const [recaptchaScriptLoaded, setRecaptchaScriptLoaded] = useState(false);
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.google.com/recaptcha/api.js?render=6LcbVFYnAAAAALilTDaBrbqfc6CHUs9K1S05kaAc'; // Replace with your actual reCAPTCHA v3 site key
    script.async = true;
    script.onload = () => {
      setRecaptchaScriptLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  const verifyRecaptcha = async () => {
    return new Promise((resolve) => {
      if (recaptchaScriptLoaded) {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute('6LcbVFYnAAAAALilTDaBrbqfc6CHUs9K1S05kaAc', {
              action: 'submit',
            }) // Replace with your actual reCAPTCHA v3 site key
            .then((token) => {
              resolve(token);
            });
        });
      } else {
        resolve(null);
      }
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => onSubmit(values, verifyRecaptcha), // Pass verifyRecaptcha to onSubmit
    validationSchema,
  });
  const formikLogin = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => onSubmit(values, verifyRecaptcha),
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string().required('Please Enter your password'),
    }),
  });

  return (
    <div>
      <Router>
        <main className="App">
          <Switch>
            <Route path="/login">
              <LoginPage
                formikLogin={formikLogin}
                handleSubmit={formikLogin.handleSubmit}
              />
            </Route>
            <Route path="/" exact>
              <SignUpPage formik={formik} handleSubmit={formik.handleSubmit} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default SetFormik;
