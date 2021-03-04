import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

export default function TextareaForm({ name, value, maxHeightValue,
  handleChange, handleBlur, errors, touched, placeholder }) {


  return (
    <div className="form__group form__group--textarea">
      <TextareaAutosize
        style={{ minHeight: 30, maxHeight: { maxHeightValue } || 100 }}
        name={name}
        className="form__control form__control--textarea"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        value={value}
      />
      <span className={`form__line ${errors[name] && touched[name] && "form__line-error"}`}></span>

      {touched[name] && errors[name] ? (
        <div className="form__input-feedback" >{errors[name]}</div>
      ) : null}

    </div>
  )
}
