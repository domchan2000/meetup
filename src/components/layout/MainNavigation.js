import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { logout } from "../../store/firebase";


import classes from './MainNavigation.module.css';
import ImportantContext from '../../store/important-context';

function MainNavigation() {
  const importantCtx = useContext(ImportantContext);

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
            <Link to='/important'>
              My Importants
              <span className={classes.badge}>
                {importantCtx.totalImportant}
              </span>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;