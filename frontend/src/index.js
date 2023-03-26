import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CheckIn from './pages/checkin';
import ViewDaycare from './pages/viewDaycare';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "CheckIn",
    element: <CheckIn/>,
  },
  {
    path: "ViewDaycare",
    element: <ViewDaycare/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
