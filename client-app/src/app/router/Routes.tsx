import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

// Create array of route objects

export const routes: RouteObject[] = [
    
    {
        // create root of our routes
        path: '/',
        element: <App />,

        // create child routes
        // NOTE: We need to create an <Outlet /> for these components to be loaded into, so each component should have one defined.

        children: [
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm key='create' />},
            {path: 'manage/:id', element: <ActivityForm key='manage' />}
        ]
    }
]

export const router = createBrowserRouter(routes);