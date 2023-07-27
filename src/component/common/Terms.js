import React from 'react';
const Terms = ({ name, formik }) => {
  return (
    <div className="formControl">
      <input
        type="checkbox"
        id="terms"
        value={true}
        name={name}
        onChange={formik.handleChange}
        checked={formik.values.terms}
      />
      <label htmlFor="terms">I agree to the terms & policy</label>

      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Terms;
