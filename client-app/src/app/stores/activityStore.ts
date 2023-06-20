import { makeAutoObservable, runInAction} from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

// used to get an Guid id
import {v4 as uuid} from 'uuid';

import { act } from "@testing-library/react";
import { arrayBuffer } from "stream/consumers";

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>;

    selectedActivity: Activity |undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        // Let's return an array of objects.
        // Each object has a key of type string (which will be the activity date)
        // and for each date we'll have an array of activities

        // The javascript method "reduce" will help us group the activities into dates

        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )

    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                    this.setActivity(activity);
                })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {

        //Let's first check to see if the activity we're looking for is already on registry.
        //If not, we'll fetch it from our API

        let activity = this.getActivity(id);
        if(activity) {
            this.selectedActivity = activity;
            return activity;
        } 
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);

                runInAction(() => this.selectedActivity = activity)
              
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        //will return undefined if not found
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity:Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        
        try{
            await agent.Activities.update(activity);

            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        
        try{
            await agent.Activities.delete(id);

            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}