import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNewsData } from '../redux/actions/news';
import Loader from '../assets/loader/Loader';
import clockIcon from '../assets/svg/clock.svg';
import userIcon from '../assets/svg/user.svg';
import { cutText } from '../utils/cutText';
import DateFns from '../common/date-fns/DateFns';
import Search from '../common/search/Search';
import { filterList } from '../utils/filterList';


export default function News() {

  const [sortText, setSortText] = useState('');

  const dispatch = useDispatch();

  const { news, preloader } = useSelector(({ news }) => news);

  const filterNews = filterList(news, sortText, "title");

  useEffect(() => {
    dispatch(getNewsData());
  }, [dispatch]);


  const numberInBlock = (filterNews.length > 0) ? Math.ceil(filterNews.length / 2) : 2;

  const newNewsArr1 = [[...filterNews.slice(0, numberInBlock)],
  [...filterNews.slice(numberInBlock)]];

  return (
    <>
      {!preloader
        ? <>
          <div className="page">
            <div className="container">
              <div className="page__header">
                <Search sortText={sortText} setSortText={setSortText} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="news">
              {newNewsArr1.map((block, i) => (
                <div key={i} className="news__column">
                  {block.map(el => (
                    <div key={el.newsId} className="news__block">
                      {el.urlToImage
                        ? <img className="news__image" src={el.urlToImage} alt="news" />
                        : <img className="news__image" src="https://placehold.it/300x100" alt="news" />
                      }
                      <div className="news__block-bottom">
                        <a target="_blank" href={el.url} className="news__title">{cutText(el.title, 60)}</a>
                        <p className="news__description">{el.description}</p>
                        <div className="news__info">
                          {el.author && (<div className="news__autor"><img src={userIcon} alt="user" /><span>{el.author}</span></div>)}
                          <div className="news__time"><img src={clockIcon} alt="clock" /><DateFns date={el.publishedAt} /></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
        : <Loader />
      }
    </>
  )
}
