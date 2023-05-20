import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { Link, useLocation } from 'react-router-dom';
import Login from '../../pages/Login';


function Layout(props) {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

    if (!showHeader) {
      return (
        <Login/>
      );
    }
  
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;