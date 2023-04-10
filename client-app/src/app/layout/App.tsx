import React, { useEffect, useState } from 'react';

// This is an extension that gets installed from https://react.semantic-ui.com/usage
// For the purpose of not having to use too much html in our components
import { Container } from 'semantic-ui-react';

// Our activity model
import { Activity } from '../models/activity';

// Our components
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// used to get an id
import {v4 as uuid} from 'uuid';

// Our api 
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {

    // We can specify that we are getting back an array of Activity in the axios call.
    // We'll use our api (agent.ts)
    agent.Activities.list()
    .then(response => {

      let activities: Activity[] = [];

      response.forEach(activity => {
      activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      
      setActivities(activities);
      setLoading(false);

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

    setSubmitting(true);
    
        // ... -> loop through activities

    if (activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }

  }

  function handleDeleteActivity (id: string) {

    setSubmitting(true);

    agent.Activities.delete(id).then(() => {

      // Load thru activities without activity with id passed in parameter
      // ... -> loop through activities

      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })

  }

  if (loading) return <LoadingComponents content='Loading App' />

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
          submitting={submitting}
        />

      </Container>
            
    </>
  );
}

export default App;
