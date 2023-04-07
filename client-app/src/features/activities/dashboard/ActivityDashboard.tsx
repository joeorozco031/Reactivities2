import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;   //function returns void
    cancelSelectActivity: () => void;       //function returns void
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity,
        editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity} 
                    deleteActivity={deleteActivity} 
            />
            </Grid.Column>
            <Grid.Column width='6'>

                {/* To avoid app crashing with "object undefined", check to see that an activity record is actually available
                    before trying to display it.

                    "activities[0] &&" checks if object is available.

                    && -> Anything to the right of this sign will execute so long as the condition to the left is not null or undefined

                 */}

                {selectedActivity && !editMode &&

                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                        
                    />
                }

                {editMode && 
                    <ActivityForm 
                        activity={selectedActivity}
                        closeForm={closeForm}
                        createOrEdit={createOrEdit}
                    />

                }
                
            </Grid.Column>
        </Grid>
    )
}