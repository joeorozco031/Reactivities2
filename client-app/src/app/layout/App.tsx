import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This is an extension that gets installed from https://react.semantic-ui.com/usage
// For the purpose of not having to use too much html in our components
import { Container } from 'semantic-ui-react';

// Our activity model
import { Activity } from '../models/activity';

// Our components
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import {v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {

    // We can specify that we are getting back an array of Activity in the axios call.
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    })
  }, [])  /* Add [] to make the following code run only once. */


  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen( id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose () {
    setEditMode(false);
  }

  function handleCreateOrEditActivity (activity: Activity) {

    // ... -> loop through activities

    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity (id: string) {

    // Load activities without activity with id passed in parameter
    // ... -> loop through activities

    setActivities([...activities.filter(x => x.id !== id)]);

  }

  return (

    // NOTE:  We don't necessarily have to specify an <Div> at the beginning
    //        We can specify that we return a Fragment instead of DIV and that will meet the requirement
    //        And empty <> is the short way of returning a Fragment

    <>
      
      <NavBar openForm={handleFormOpen} />

      <Container style={{marginTop: '7em'}}>
        
        <ActivityDashboard 
        
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />

      </Container>
            
    </>
  );
}

export default App;
