import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import CategoryList from "./routes/CategoryList";
//import CategoryCreate from "./routes/CategoryCreate";
import EmployeeList from "./routes/EmployeeList";
import home from "./routes/home";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  {
    path: "/category/list",
    element: <CategoryList />,
  },

  // {
  //   path: "/category/create",
  //   element: <CategoryCreate />,
  // },

  {
    path: "/employee/list",
    element: <EmployeeList />,
  },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

