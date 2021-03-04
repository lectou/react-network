import React, { useEffect, useState, useRef } from 'react';
import { getPostsData, setNewPostData, deletePostData } from '../redux/actions/posts';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputForm from '../common/InputForm/InputForm';
import TextareaForm from '../common/textareaForm/TextareaForm';
import Modal from '../common/Modal/Modal';
import Dropdown from '../common/dropdown/Dropdown';
import dropdown from '../assets/svg/dropdown.svg';
import deleteIcon from '../assets/svg/delete.svg';
import Search from '../common/search/Search';
import DateFns from '../common/date-fns/DateFns';
import { filterList } from '../utils/filterList';
import { cutText } from '../utils/cutText';
import { NavLink } from "react-router-dom";
import AuthRedirect from '../hoc/AuthRedirect';

import Loader from '../assets/loader/Loader';

const Posts = () => {

  const dispatch = useDispatch();
  const deleteButtonRef = useRef(null);

  const [activeModal, setActiveModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeDeleteButtons, setActiveDeleteButtons] = useState(false);
  const [sortText, setSortText] = useState('');

  const { posts, preloader } = useSelector(({ posts }) => posts);


  useEffect(() => {
    dispatch(getPostsData());
  }, [dispatch]);

  const newPost = {
    image: null,
    title: null,
    text: null,
    like: 0,
    dislike: 0,
    date: new Date(),
    id: Math.random().toString(36).substr(2, 9),
  }


  const addPost = () => {
    setActiveDropdown(false);
    setActiveModal(true);
  }

  const deletePost = (id) => {
    let result = window.confirm("Are you shure")
    if (result) {
      dispatch(deletePostData(id))
    }
    else {
      return;
    }
  }

  const filterPosts = filterList(posts, sortText, "title");

  const visibleDeleteButtons = () => setActiveDeleteButtons(!activeDeleteButtons);
  const noVisibleDeleteButtons = () => setActiveDeleteButtons(false);

  const handleOutsideClick = (event) => {
    const deleteBtn = document.querySelector('.delete-posts');
    if (event.path.includes(deleteBtn)) {
      return
    } else {
      noVisibleDeleteButtons()
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (

    <>
      {!preloader
        ? <>
          <div className="page">
            <div className="container">
              <div className="page__header">
                <button className="page__btn btn__dropdown" onClick={() => setActiveDropdown(!activeDropdown)}>
                  <img src={dropdown} alt="dropdown" />
                </button>
                {activeDropdown
                  ? <Dropdown
                    setActiveDropdown={setActiveDropdown}
                  >
                    <ul className="dropdown__list">
                      <li className="dropdown__item add-posts" onClick={addPost}>Add post</li>
                      <li className="dropdown__item delete-posts" onClick={visibleDeleteButtons}>Delete posts</li>
                    </ul>
                  </Dropdown>
                  : null}
                <Search sortText={sortText} setSortText={setSortText} />
              </div>
            </div>
          </div>

          <div className="posts container">

            {activeModal
              ? <Modal setActiveModal={setActiveModal} >

                <div className="posts__create-post">

                  <Formik
                    initialValues={{
                      title: "",
                      text: "",
                      photo: ""
                    }}

                    validationSchema={Yup.object({
                      title: Yup.string().trim()
                        .min(3, 'A minimum of 3 characters is required')
                        .max(30, 'Maximum allowed characters is 30'),
                      text: Yup.string().trim()
                        .min(3, 'A minimum of 3 characters is required')
                        .max(1000, 'Maximum allowed characters is 1000'),
                      photo: Yup.string().url('Please enter a valid URL, including scheme',
                        { allowLocal: true })
                    })}
                    onSubmit={(values, { resetForm }) => {
                      setActiveModal(false);
                      newPost.image = values.photo;
                      newPost.title = values.title;
                      newPost.text = values.text;
                      dispatch(setNewPostData(newPost));
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
                      <form className="posts__form" onSubmit={handleSubmit} >
                        <div className="form__input">

                          <InputForm
                            name="photo"
                            type="text"
                            value={values.photo}
                            placeholder="Photo URL..."
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                          />

                          <InputForm
                            name="title"
                            type="text"
                            value={values.title}
                            placeholder="Title"
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors}
                            touched={touched}
                          />

                          <TextareaForm
                            name="text"
                            value={values.text}
                            placeholder="Text"
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
                          Add
                      </button>

                      </form>

                    )}

                  </Formik>

                </div>

              </Modal>
              : null}

            {filterPosts.map(post => (
              <div className="post" key={post.id}>
                <div className="post__header post__header-preview" style={{ backgroundImage: `url(${post.image})` }}>
                </div>
                <div className="post__content">
                  <h2 className="post__title">{post.title}</h2>
                  <p className="post__description post__description-item">{cutText(post.text, 500)}</p>
                  <div className="post__footer">
                    <DateFns date={post.date} />
                    <NavLink className="post__read" to={`/post/${post.id}`}>читать</NavLink>
                  </div>
                </div>

                {activeDeleteButtons
                  ? <div className="delete-post" ref={deleteButtonRef} onClick={() => deletePost(post.id)}>
                    <img className="delete-post__icon" src={deleteIcon} alt="icon" />
                  </div>
                  : null}
              </div>
            ))}
          </div>
        </>
        : <Loader />

      }
    </>
  )
}

export default AuthRedirect(Posts);