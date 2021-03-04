import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextareaForm from '../textareaForm/TextareaForm';
import sendIcon from '../../assets/svg/send.svg';

import './dialogForm.scss';

export default function DialogForm({ setMyPost, userId, myName, comments, postId, myPhoto }) {

  const newPost = {
    userId: userId,
    text: null,
    date: new Date(),
    id: Math.random().toString(36).substr(2, 9)
  };

  const newComment = {
    name: myName,
    date: new Date(),
    id: Math.random().toString(36).substr(2, 9),
    postId: postId,
    text: null,
    photo: myPhoto
  };

  return (
    <Formik
      initialValues={{
        text: ""
      }}

      validationSchema={Yup.object({
        text: Yup.string().trim()
          .min(3, 'A minimum of 3 characters is required')
          .max(300, 'Must be 300 characters or less')
      })}
      onSubmit={(values, { resetForm }) => {
        if (comments) {
          newComment.text = values.text;
          setMyPost(newComment);
        } else {
          newPost.text = values.text;
          setMyPost(newPost);
        }
        resetForm();
      }}
    >
      {({
        dirty,
        touched,
        errors,
        isValid,
        values,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form className="dialog-form__form" onSubmit={handleSubmit} >
          {!comments
            ? <img
              className="dialog-form__photo"
              src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
              alt="user" />
            : null}
          <div className="form__input">
            <TextareaForm
              name="text"
              value={values.text}
              placeholder="Write here..."
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          </div>
          <button
            type="submit"
            className="dialog-form__send"
            disabled={!(isValid && dirty)}
          >
            <img src={sendIcon} alt="send_icon" />
          </button>

        </form>

      )}

    </Formik>
  )
}
