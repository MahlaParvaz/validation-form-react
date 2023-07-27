import React, { useEffect, useState } from 'react';
import userImage from '../../assets/img/logo.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../common/Input';
import Terms from '../common/Terms';
import PasswordInput from '../common/PasswordInput';
import { Link } from 'react-router-dom';

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
    .required('Password Coonfirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

  terms: Yup.boolean()
    .required('The term and conditions must e accepted')
    .oneOf([true], 'You need to accept the terms and conditions'),
});

const SignUpPage = () => {
  const [recaptchaScriptLoaded, setRecaptchaScriptLoaded] = useState(false);
  // const [passwordShown, setPasswordShown] = useState(false);
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
  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };
  return (
    <div className="signUpForm">
      <div className="logo">
        <img src={userImage} alt="logo" />
      </div>

      <form className="formStyle" onSubmit={formik.handleSubmit}>
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
        <Terms formik={formik} name="terms" />
        <button
          className="formControl"
          type="submit"
          disabled={!formik.isValid}
        >
          {' '}
          {/* The button is always enabled */}
          <span>Signup</span>
        </button>
        <Link to="/login" className='login'>
            Have you account?
            <span>Login</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;

// import React, { useEffect, useState } from 'react';
// import userImage from '../../assets/img/logo.png';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Input from '../common/Input';
// import Terms from '../common/Terms';
// import PasswordInput from '../common/PasswordInput';
// const initialValues = {
//   name: '',
//   email: '',
//   password: '',
// };

// const onSubmit = async (values, verifyRecaptcha) => {
//   const recaptchaResponse = await verifyRecaptcha(); // Call the function to verify reCAPTCHA v3
//   if (recaptchaResponse) {
//     console.log('reCAPTCHA v3 verified:', recaptchaResponse);
//     console.log('Form values:', values);
//     // You can now submit the form or perform other actions.
//   } else {
//     console.log('reCAPTCHA v3 verification failed.');
//   }
// };

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .required('Name is required')
//     .min(6, 'Name length is not valid'),
//   email: Yup.string()
//     .email('Invalid email format')
//     .required('Email is required'),

//   password: Yup.string()
//     .required('Please Enter your password')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
//     ),
//   passwordConfirm: Yup.string()
//     .required('Password Coonfirmation is required')
//     .oneOf([Yup.ref('password'), null], 'Passwords must match'),

//   terms: Yup.boolean()
//     .required('The term and conditions must e accepted')
//     .oneOf([true], 'You need to accept the terms and conditions'),
// });

// const SignUpPage = () => {
//   const [recaptchaScriptLoaded, setRecaptchaScriptLoaded] = useState(false);
//   // const [passwordShown, setPasswordShown] = useState(false);
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src =
//       'https://www.google.com/recaptcha/api.js?render=6LcbVFYnAAAAALilTDaBrbqfc6CHUs9K1S05kaAc'; // Replace with your actual reCAPTCHA v3 site key
//     script.async = true;
//     script.onload = () => {
//       setRecaptchaScriptLoaded(true);
//     };
//     document.body.appendChild(script);
//   }, []);

//   const verifyRecaptcha = async () => {
//     return new Promise((resolve) => {
//       if (recaptchaScriptLoaded) {
//         window.grecaptcha.ready(() => {
//           window.grecaptcha
//             .execute('6LcbVFYnAAAAALilTDaBrbqfc6CHUs9K1S05kaAc', {
//               action: 'submit',
//             }) // Replace with your actual reCAPTCHA v3 site key
//             .then((token) => {
//               resolve(token);
//             });
//         });
//       } else {
//         resolve(null);
//       }
//     });
//   };

//   const formik = useFormik({
//     initialValues,
//     onSubmit: (values) => onSubmit(values, verifyRecaptcha), // Pass verifyRecaptcha to onSubmit
//     validationSchema,
//   });
//   // const togglePassword = () => {
//   //   setPasswordShown(!passwordShown);
//   // };
//   return (
//     <div className="container">
//       <div className="logo">
//         <img src={userImage} alt="logo" />
//       </div>
//       <div className="signUpForm">
//         <h2>Get Started Now</h2>
//         <form className="formStyle" onSubmit={formik.handleSubmit}>
//           <Input
//             formik={formik}
//             name="name"
//             placeholder="Enter your name"
//             label="Name"
//           />
//           <Input
//             formik={formik}
//             name="email"
//             placeholder="Enter your email"
//             label="Email address"
//           />
//           <PasswordInput
//             formik={formik}
//             name="password"
//             placeholder="Enter your password"
//             label="Password"
//             type="password"
//           />
//           <PasswordInput
//             formik={formik}
//             name="passwordConfirm"
//             placeholder="Enter your password"
//             label="Confirm Password"
//             type="password"
//           />
//           <Terms formik={formik} name="terms" />
//           <button type="submit" disabled={!formik.isValid}>
//             {' '}
//             {/* The button is always enabled */}
//             <span>Signup</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
