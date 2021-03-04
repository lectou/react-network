import React from 'react';
import DialogForm from '../common/dialogForm/DialogForm';
import DateFns from '../common/date-fns/DateFns';

export default function Comments({ newComment, comments, myName, postId, myPhoto }) {


  return (
    <div className="comments">
      <ul className="comments__area">
        {comments.map(comment => (
          <li key={comment.id} className="comments__item">
            <div className="comments__header">
              <img
                className="comments__avatar"
                src={comment.photo}
                alt="user__photo" />
              <div className="comments__autor">
                <div className="comments__name">{comment.name}</div>
                <DateFns date={comment.date} distance />
              </div>
            </div>
            <p className="comments__text">{comment.text}</p>
          </li>
        ))}
      </ul>
      <DialogForm
        setMyPost={newComment}
        myName={myName}
        myPhoto={myPhoto}
        postId={postId}
        comments
      />
    </div>
  )
}
