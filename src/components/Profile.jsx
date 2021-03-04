import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile, updatePhoto } from '../redux/actions/profile';
import { Formik } from 'formik';
import InputForm from '../common/InputForm/InputForm';
import TextareaForm from '../common/textareaForm/TextareaForm';
import Loader from '../assets/loader/Loader';
import Modal from '../common/Modal/Modal';
import AuthRedirect from '../hoc/AuthRedirect';
import * as Yup from 'yup';

const ProfilePage = () => {

  const [activeModal, setActiveModal] = useState(false);

  const dispatch = useDispatch();
  const { name, email, preloader,
    aboutMe, status, photo, info } = useSelector(({ profile }) => profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const validationString = Yup.string().trim()
    .min(3, 'A minimum of 3 characters is required')
    .max(20, 'Maximum allowed characters is 20')

  return (
    <div className="container">
      {!preloader
        ? <>
          <div className="profile-page">
            <div className="profile-page__avatar">
              <img src={photo} alt="profile-avatar" />
              <button onClick={() => setActiveModal(true)}>select photo</button>
            </div>

            {activeModal
              ? <Modal setActiveModal={setActiveModal} >
                <Formik
                  initialValues={{
                    photo: ""
                  }}
                  validationSchema={Yup.object({
                    photo: Yup.string().url('Please enter a valid URL, including scheme',
                      { allowLocal: true })
                  })}
                  onSubmit={values => {
                    setActiveModal(false);
                    dispatch(updatePhoto(values.photo));
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
                    <form className="posts__form" onSubmit={handleSubmit} >
                      <div className="form__input">

                        <InputForm
                          name="photo"
                          type="text"
                          placeholder="Photo URL://"
                          value={values.photo}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                      <button
                        type="submit"
                        className="modal__button btn btn--rounded btn--sm btn--green"
                        disabled={!(isValid && dirty)}
                      >
                        Save
                      </button>
                    </form>
                  )}

                </Formik>
              </Modal>
              : null}
            <div className="profile-page__form">
              <Formik
                initialValues={{
                  name: name,
                  email: email,
                  aboutMe: aboutMe,
                  status: status,
                  info: info
                }}
                validationSchema={Yup.object({
                  name: validationString,
                  email: Yup.string().trim()
                    .email('Invalid email address')
                    .required('Required'),
                  aboutMe: validationString,
                  status: validationString,
                  info: Yup.string().trim()
                    .min(3, 'A minimum of 3 characters is required')
                    .max(1000, 'Maximum allowed characters is 1000'),
                })}
                onSubmit={(values, actions) => {
                  dispatch(updateProfile(values));
                  actions.setSubmitting(false);
                }}
              >
                {({
                  dirty,
                  touched,
                  errors,
                  values,
                  isSubmitting,
                  handleChange,
                  handleReset,
                  handleSubmit
                }) => (
                  <form className="profile-page__form" onSubmit={handleSubmit}>
                    <div className="form__input">
                      <InputForm
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={values.name}
                        errors={errors}
                        handleChange={handleChange}
                        touched={touched}
                      />
                      <InputForm
                        name="status"
                        type="text"
                        placeholder="Status"
                        value={values.email}
                        errors={errors}
                        handleChange={handleChange}
                        touched={touched}
                      />
                      <InputForm
                        name="aboutMe"
                        type="Text"
                        placeholder="aboutMe"
                        value={values.aboutMe}
                        errors={errors}
                        handleChange={handleChange}
                        touched={touched}
                      />
                      <InputForm
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={values.email}
                        errors={errors}
                        handleChange={handleChange}
                        touched={touched}
                      />
                      <TextareaForm
                        name="info"
                        placeholder="Info"
                        handleChange={handleChange}
                        errors={errors}
                        value={values.info}
                        touched={touched}
                        maxHeightValue={500}
                      />
                    </div>

                    <div className="form__buttons">
                      <button
                        className="form__button btn btn--rounded btn--sm btn--red"
                        type="button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}>
                        Reset
                      </button>
                      <button
                        className="form__button btn btn--rounded btn--sm btn--green"
                        type="submit"
                        disabled={!dirty || isSubmitting}
                      >
                        Save
                      </button>
                    </div>

                  </form>
                )}
              </Formik>
            </div>
          </div>
        </>
        : <Loader />
      }

    </div>
  )
}

export default AuthRedirect(ProfilePage);
