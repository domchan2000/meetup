import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logout } from "../../store/firebase";


import classes from './MainNavigation.module.css';
import FavoritesContext from '../../store/favourites-context';

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to='/all'>All Meetups</Link>
          </li>
          <li>
            <Link to='/new-meetup'>Add New Meetup</Link>
          </li>
          <li>
            <Link to='/favorites'>
              My Favorites
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
          <li>
            <Link to='/'>            
              <a onClick={logout}>Logout</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;