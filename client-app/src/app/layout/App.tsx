
// This is an extension that gets installed from https://react.semantic-ui.com/usage
// For the purpose of not having to use too much html in our components
import { Container } from 'semantic-ui-react';

// Our components
import NavBar from './NavBar';

import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {

  const location = useLocation();

  return (

    // NOTE:  We don't necessarily have to specify a <Div> at the beginning
    //        We can specify that we return a Fragment instead of DIV and that will meet the requirement.
    //        And empty <></> is the short way of returning a Fragment

    //        Also, we use <Outlet /> to determine where the components defined in Routes.tsx will be placed.

    <>
      
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />

          <Container style={{marginTop: '7em'}}>
            
            <Outlet />

          </Container>
        </>
      )}

      
            
    </>
  );
}

export default observer(App);
