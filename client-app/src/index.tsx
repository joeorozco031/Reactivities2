import React from 'react';
// import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import reportWebVitals from './reportWebVitals';
import { StoreContext, store } from './app/stores/store';
import ReactDOM from 'react-dom/client';
import { router } from './app/router/Routes';
import { RouterProvider } from 'react-router-dom';

/* ReactDOM.render(

  // We'll be providing our context to our application
  // where all of our states will be stored and be able to be access by our components
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,

  document.getElementById('root')
);
 */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  // NOTE:  We have to turn off StrictMode temporarily because some html components from Semantic UI React
  //        do not work well in StrictMOde
  
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

   // We'll be providing our context to our application
  // where all of our states will be stored and be able to be access by our components
  
  // Also, we are not going to be using our <App > component directly, but use routes defined in Routes.tsx

  <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
  </StoreContext.Provider>,

);

/// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
