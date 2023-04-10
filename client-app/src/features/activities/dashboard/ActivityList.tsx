import React, { SyntheticEvent, useState } from 'react';
import { Activity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
    activities: Activity[],
    selectActivity: (id: string) => void;   //function returns void
    deleteActivity: (id: string) => void;   //function returns void
    submitting: boolean;
}

export default function ActivityList( {activities, selectActivity, deleteActivity, submitting}: Props) {
    
    const [target, setTarget] = useState('');

    function handleActivityDelete( e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }


    return (
        
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Button 
                                    name={activity.id}  // use name attribute so that only the button clicked will show "loading"

                                    // Check if name of button is equal to activity we're trying to delete; if so, show "loading"
                                    loading={submitting && target === activity.id} 

                                    // use local function to delete activity
                                    onClick={(e) => handleActivityDelete(e, activity.id)} 

                                    floated='right' 
                                    content='Delete' 
                                    color='red'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>

    )
}