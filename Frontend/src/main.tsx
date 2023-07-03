import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CategoryList from "./routes/CategoryList";
import CategoryForm from "./routes/CategoryForm";
import EmployeeList from "./routes/EmployeeList";
import EmployeeForm from "./routes/EmployeeForm";
import Home from "./routes/Home";
import { AppThemeProvider } from './contexts';


const router = createBrowserRouter([

   {
    path: "/",
     element: <Home />,
   },
  {
    path: "/category/list",
    element: <CategoryList />,
  },

  {
    path: "/category/create",
    element: <CategoryForm />,
  },

  {
    path: "/category/update/:id",
    element: <CategoryForm isEdit={true}/>,
  },

  {
    path: "/employee/list",
    element: <EmployeeList />,
  },

  {
    path: "/employee/create",
    element: <EmployeeForm />,
  },

  {
    path: "/employee/update/:id",
    element: <EmployeeForm isEdit={true}/>,
  },

]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <AppThemeProvider>
    <RouterProvider router={router} />
    </AppThemeProvider>
  </React.StrictMode>,
)

