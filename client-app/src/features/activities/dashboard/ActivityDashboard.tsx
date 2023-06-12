import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer( function ActivityDashboard() {
    
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>

                {/* To avoid app crashing with "object undefined", check to see that an activity record is actually available
                    before trying to display it.

                    "activities[0] &&" checks if object is available.

                    && -> Anything to the right of this sign will execute so long as the condition to the left is not null or undefined

                 */}

                {selectedActivity && !editMode &&

                    <ActivityDetails 
                    />
                }

                {editMode && 
                    <ActivityForm />

                }
                
            </Grid.Column>
        </Grid>
    )
})