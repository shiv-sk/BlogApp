import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import NewBlog from './pages/NewBlog.jsx';
import BlogDetail from './pages/Blogdetail.jsx';
import Login from './pages/Login.jsx';
import Exp from './pages/Exp.jsx';
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"newblog",
        element:<NewBlog/>
      },
      {
        path:"blog/:blogId",
        element:<BlogDetail/>
      },
      {
        path:"exp",
        element:<Exp/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
     <App/> 
    </RouterProvider>
  </StrictMode>,
)
