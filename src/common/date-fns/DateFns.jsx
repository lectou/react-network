import React from 'react';
import format from 'date-fns/format';
import './dateFns.scss';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function DateFns({ date, distance }) {
  return (
    <div className="date">
      {distance
        ? formatDistanceToNow(new Date(date), { addSuffix: true })
        : format(new Date(date), 'dd/MM/yy')}
    </div>
  )
}
