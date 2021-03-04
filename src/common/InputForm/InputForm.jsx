import React from 'react';
import { Field } from 'formik';

export default function InputForm({ name, type, value,
  handleChange, handleBlur, errors, touched, placeholder }) {
  return (
    <div className="form__group">
      <Field
        className="form__control"
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      <span className={`form__line ${errors[name] && touched[name] && "form__line-error"}`}></span>

      {touched[name] && errors[name] ? (
        <div className="form__input-feedback" >{errors[name]}</div>
      ) : null}

    </div>
  )
}
