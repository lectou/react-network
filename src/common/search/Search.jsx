import React from 'react';
import './search.scss';
import searchIcon from '../../assets/svg/search.svg';

export default function Search({ sortText, setSortText, header }) {


  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search..."
        value={sortText}
        onChange={(e) => {
          setSortText(e.target.value);
        }}
      />
      <div className="search__icon">
        <img src={searchIcon} alt="search" />
      </div>
    </form>
  )
}
