import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponents from '../../../app/layout/LoadingComponents';

export default observer( function ActivityDashboard() {
    
    // We're destructing our store object here to be able to access the useStore function only.
    const {activityStore} = useStore();
    // We're destructing our activity store object here to be able to access some functionality.
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {

        // We can specify that we are getting back an array of Activity in the axios call.
        // We'll use our api (agent.ts) that is being used in our activityStore.
        // But first we'll check if our activity list is already loaded into memory,
        // if NOT, we'll call our api to load the activity list

        if(activityRegistry.size <= 1) activityStore.loadActivities();
        

    }, [loadActivities, activityRegistry.size])  /* Add [activityStore] as a dependency to our useEffect to make the following code run only once. */

  
  if (activityStore.loadingInitial) return <LoadingComponents content='Loading App' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
})