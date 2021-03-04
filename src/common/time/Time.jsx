import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Time = ({ date }) => {
  return (
    <div className="time" style={{ fontSize: "1.2rem" }} >
      {formatDistanceToNow(new Date(date), { addSuffix: true })}
    </div>
  )
}

export default Time;
