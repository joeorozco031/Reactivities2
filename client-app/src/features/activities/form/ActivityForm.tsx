import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


// Because we use the name "activity" twice in this function
// We have to rename the activity parameter as "selectedActivity"

export default observer( function ActivityForm () {

    const {activityStore} = useStore();
    
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    // ?? -> if activity is not UNDEFINED then anything to the right of ?? will be processed
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit () {
        activity.id ? updateActivity(activity) : createActivity(activity);
        
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
                <Form.Input type="date" placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type="submit" content='Submit' />
                <Button floated="right" type="button" content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    )
})