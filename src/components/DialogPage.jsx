import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import userIcon from '../assets/svg/user.svg';
import DialogForm from '../common/dialogForm/DialogForm';
import Time from "../common/time/Time";
import Loader from '../assets/loader/Loader';
import {
  setDialogData, setNewMessage
} from '../redux/actions/dialogPage';


export default function DialogPage() {
  const dispatch = useDispatch();
  let history = useHistory();

  const { name, id, photo, dialogs,
    preloader } = useSelector(({ dialogPage }) => dialogPage);

  const setMyPost = (post) => dispatch(setNewMessage(post));

  let urlPath = history.location.pathname.split('dialog/')[1];
  useEffect(() => {
    dispatch(setDialogData(urlPath));
  }, [dispatch, urlPath]);

  console.log("Dialog Page");

  return (
    <>
      {!preloader
        ? <>
          <div className="dialog-page__header">
            <div className="dialog-page__wrapper container">
              {photo
                ? <img className="dialog-page__photo" src={photo} alt="user" />
                : <img className="dialog-page__photo" src={userIcon} alt="user" />
              }
              <div className="dialog-page__description">
                <div className="dialog-page__name">{name}</div>
                <div className="dialog-page__status">Online</div>
              </div>
            </div>
          </div>
          <div className="container">
            {(dialogs.length > 0)
              ? <ul className="message">
                {dialogs.map(el => (
                  <li
                    key={el.id}
                    className={classNames("message__item", { "message__item--my": !el.user })}
                  >
                    <p className="message__text">{el.text}</p>
                    <Time date={el.date} />
                  </li>
                ))}
              </ul>
              : <div className="message message__no-message"><h2>No dialogs</h2></div>
            }

            <DialogForm setMyPost={setMyPost} userId={id} />
          </div>
        </>

        : <Loader />
      }
    </>
  )
}
