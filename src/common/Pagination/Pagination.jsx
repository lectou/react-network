import React, { useState } from 'react';
import classNames from 'classnames';
import left from '../../assets/svg/chevron-left.svg';
import right from '../../assets/svg/chevron-right.svg';
import './pagination.scss';

const Pagination = ({ totalUsersCount, pageSize, currentPage, onClickPage }) => {

  let pagesCount = Math.ceil(totalUsersCount / pageSize); // pageSections number
  let pagesArr = [];
  let i = 1;
  while (i <= pagesCount) {
    pagesArr.push(i);
    i++
  }

  const sectionSize = 3; // count numbers in pagination

  const [sectionNumber, setSectionNumber] = useState(0);

  let newPageArr = pagesArr.slice(sectionNumber, sectionNumber + sectionSize);


  const toggleNext = () => {
    setSectionNumber(sectionNumber + sectionSize);
  }

  const togglePrev = () => {
    setSectionNumber(sectionNumber - sectionSize);
  }

  const activePage = (number) => onClickPage(number)


  return (
    <div className="pagination">

      <button className="pagination__item pagination__button"
        onClick={togglePrev}
        disabled={!newPageArr.includes(1) ? false : true}
      > <img className="pagination__chevron" src={left} alt="left" /></button>

      {newPageArr.map(el => {
        return <span
          key={el}
          onClick={() => activePage(el)}
          className={classNames("pagination__item", { "active": currentPage === el })}
        > {el} </span>
      })}

      <button className="pagination__item pagination__button"
        onClick={toggleNext}
        disabled={!newPageArr.includes(pagesCount) ? false : true}
      > <img className="pagination__chevron" src={right} alt="right" /> </button>

    </div>
  )
}

export default React.memo(Pagination);

