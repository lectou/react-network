import React, { useEffect } from 'react';
import Comments from './Comments';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsComments, setNewComment } from '../redux/actions/postPage';
import Loader from '../assets/loader/Loader';
import DateFns from '../common/date-fns/DateFns';
import backIcon from '../assets/svg/back.svg';


export default function PostPage() {

  const dispatch = useDispatch();
  let history = useHistory();

  const back = () => history.goBack();

  const { preloader, comments, title, text, date, image, id } = useSelector(({ postPage }) => postPage);
  const { name, photo } = useSelector(({ profile }) => profile);

  const newComment = (comment) => dispatch(setNewComment(comment))

  let postIdUrl = history.location.pathname.split('post/')[1];

  useEffect(() => {
    dispatch(getPostsComments(postIdUrl));
  }, [dispatch]);


  return (
    <>
      {!preloader
        ? <div className="container">
          <div className="post">
            <div className="post__actions">
              <button className="post__back" onClick={back}>
                <img src={backIcon} alt="back" />
                <span>back</span>
              </button>
            </div>

            <h2 className="post__title">{title}</h2>
            <div className="post__footer">
              <DateFns date={date} />
            </div>

            <img className="post__image" src={image} alt="post" />
            <p className="post__description">{text}</p>
            <div className="post__comments">
              Comments
          </div>

            <Comments
              newComment={newComment}
              postId={id}
              myPhoto={photo}
              myName={name}
              comments={comments}
            />

          </div>
        </div>
        : <Loader />
      }
    </>
  )
}
