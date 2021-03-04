import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { filterList } from '../utils/filterList';
import Search from '../common/search/Search';
import {
  getDialogslist
} from '../redux/actions/dialogsList';
import UserIcon from '../assets/svg/user.svg';


export default function DialogsList({ setActiveSidebar }) {

  const [openDialogs, setOpenDialogs] = useState(false);
  const [sortText, setSortText] = useState('');

  const dialogToggle = () => setOpenDialogs(!openDialogs);

  const dispatch = useDispatch();
  const { list } = useSelector(({ dialogsList }) => dialogsList);

  const filterDialogs = filterList(list, sortText, "name")

  useEffect(() => {
    dispatch(getDialogslist());
  }, [dispatch]);

  return (
    <div className="dialog-list" style={!openDialogs ? { height: '50px' } : { height: '80vh' }}>
      <div className="dialog-list__header" onClick={dialogToggle} >
        <h4 className="dialog-list__title">Dialogs</h4>
        <p className="dialog-list__number">{list.length}</p>
      </div>

      <Search sortText={sortText} setSortText={setSortText} />

      <ul className="dialog-list__block" >
        {filterDialogs.map(el => (
          <li
            className="dialog-list__item"
            key={el.id}
            onClick={() => setActiveSidebar(false)}
          >
            <NavLink to={`/dialog/${el.id}`}>
              {el.photo
                ? <img className="dialog-list__image" src={el.photo} alt="user" />
                : <img className="dialog-list__image" src={UserIcon} alt="user" />}
              <p className="dialog-list__name">{el.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
