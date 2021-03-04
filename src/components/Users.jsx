import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import userIcon from '../assets/svg/user.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersData, follow, unFollow } from '../redux/actions/users';
import Loader from '../assets/loader/Loader';
import Pagination from '../common/Pagination/Pagination';
import AuthRedirect from '../hoc/AuthRedirect';


const Users = () => {

  const dispatch = useDispatch();
  const { users, pageSize, totalUsersCount, currentPage, preloader,
    followingLoading } = useSelector(({ users }) => users);


  useEffect(() => {
    dispatch(getUsersData(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  console.log("Users");

  const followToggle = (id) => dispatch(follow(id));
  const unFollowToggle = (id) => dispatch(unFollow(id));

  const onClickPage = React.useCallback(page => {
    dispatch(getUsersData(page, pageSize))
  }, [dispatch, pageSize]);

  return (
    <div className="container">
      {!preloader
        ? <div className="users">
          {users.map(user => (
            <div className="user" key={user.id}>
              {user.photo
                ? <img className="user__photo" src={user.photo} alt="user" />
                : <img className="user__photo" src={userIcon} alt="user" />}
              <Link className="user__name" to={`/dialog/${user.id}`}>
                {user.name}
              </Link>
              {!user.followed
                ? <button
                  className="btn btn--green btn--sm"
                  onClick={() => followToggle(user.id)}
                  disabled={followingLoading.some(el => el === user.id)}
                >Follow</button>
                : <button
                  className="btn btn--red btn--sm"
                  onClick={() => unFollowToggle(user.id)}
                  disabled={followingLoading.some(el => el === user.id)}
                >Unfollow</button>
              }
            </div>
          ))}
        </div>
        : <Loader />
      }
      <Pagination
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onClickPage={onClickPage}
      />
    </div>
  )
}

export default AuthRedirect(Users);
