import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { useLocation } from 'react-router-dom';


function Layout(props) {
  const location = useLocation();
  const excludedRoutes = ['/register', '/reset', '/'];
  const showHeader = !excludedRoutes.includes(location.pathname);

  if (showHeader) {
    return (
      <div>
        <MainNavigation />
        <main className={classes.main}>{props.children}</main>
      </div>
    );
  }

  return <>{props.children}</>;
}

export default Layout;