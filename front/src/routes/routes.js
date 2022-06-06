import React, { lazy } from 'react'
import { HomeRedirect } from './RouteUtils'
import RouteController from './RouteController'
import Homepage from '../components/Page/Homepage'
import About from '../components/views/about'
import Blog from '../components/views/Blog'
import Post from '../components/views/post'
const Login = lazy(() => import('../components/views/Login'))
const Home = lazy(() => import('../components/views/Home'))


const routes = [
    {
        path: "/",
        exact: true,
        component: Homepage
    },
    {
        path: "/login",
        exact: true,
        render: props => <Login {...props} />,
        component:HomeRedirect
    },
    {
        path: "/app",
        render: props => <RouteController component={Home} {...props} />
    },
   {
    path:"/Blog",
    exact:true,
    component:Blog
   },
   {
    path:"/Onas",
    exact:true,
    component:About
   },
   {
    path:"/Blog/post/:postId",
    exact:true,
    render: props=> <Post/>
   },

]

export default routes