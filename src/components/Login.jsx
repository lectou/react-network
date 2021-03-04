import React from 'react';
import { Formik } from 'formik';
import InputForm from '../common/InputForm/InputForm';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authData } from '../redux/actions/auth';

export default function Login() {

  const isAuth = useSelector(({ auth }) => auth.isAuth);

  const dispatch = useDispatch();

  if (isAuth) {
    return <Redirect to="/home" />
  }

  return (
    <div className="loginPage">
      <h1 className="page__title page__title-center">Login</h1>

      <div className="login">
        <Formik
          initialValues={{
            name: "",
            password: ""
          }}
          validationSchema={Yup.object({
            name: Yup.string().trim()
              .min(3, 'A minimum of 3 characters is required')
              .max(40, 'Maximum allowed characters is 40'),
            password: Yup.string().trim()
              .min(3, 'A minimum of 3 characters is required')
              .max(15, 'Maximum allowed characters is 15'),
          })}
          onSubmit={(values, { resetForm }) => {
            dispatch(authData(values.name, values.password));
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
            <form className="login__form" onSubmit={handleSubmit}>
              <div className="form__input">
                <InputForm
                  name="name"
                  type="text"
                  value={values.name}
                  placeholder="user"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
                <InputForm
                  name="password"
                  type="text"
                  value={values.password}
                  placeholder="123"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <button
                type="submit"
                className="login__button btn btn--rounded btn--sm btn--green"
                disabled={!(isValid && dirty)}
              >
                login
             </button>
            </form>
          )}

        </Formik>
      </div>
    </div>
  )
}


