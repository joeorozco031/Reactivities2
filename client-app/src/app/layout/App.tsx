import React, { useEffect} from 'react';

// This is an extension that gets installed from https://react.semantic-ui.com/usage
// For the purpose of not having to use too much html in our components
import { Container } from 'semantic-ui-react';

// Our components
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';

import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  // We're destructing our store object here to be to access the useStore function only.
  const {activityStore} = useStore();

  useEffect(() => {

    // We can specify that we are getting back an array of Activity in the axios call.
    // We'll use our api (agent.ts) that is being used in our activityStore.
     
    activityStore.loadActivities();

  }, [activityStore])  /* Add [activityStore] as a dependency to our useEffect to make the following code run only once. */

  
  if (activityStore.loadingInitial) return <LoadingComponents content='Loading App' />

  return (

    // NOTE:  We don't necessarily have to specify an <Div> at the beginning
    //        We can specify that we return a Fragment instead of DIV and that will meet the requirement
    //        And empty <> is the short way of returning a Fragment

    <>
      
      <NavBar />

      <Container style={{marginTop: '7em'}}>
        
        <ActivityDashboard />

      </Container>
            
    </>
  );
}

export default observer(App);
