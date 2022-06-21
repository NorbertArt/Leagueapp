import React, { lazy } from 'react'
import RouteController from './RouteController'
import Homepage from '../components/Page/Homepage'
import About from '../components/views/about'
import Blog from '../components/views/Blog'
import Post from '../components/views/post'
import InComing from '../components/views/inComing'
import Score from '../components/views/score'
import Teams from '../components/views/teams'
import Players from './../components/Layout/section/players';
import Addincoming from './../components/Layout/section/Addincoming';
import AddLastscore from './../components/Layout/section/AddLastscore';
import AddPost from './../components/Layout/section/AddPost';
import AddTeam from './../components/Layout/section/AddTeam';
import TeamSelected from '../components/views/TeamSelected'
const Login = lazy(() => import('../components/views/Login'))
const Home = lazy(() => import('../components/views/Home/Home'))


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
   {
    path:"/Nadchodzące-Mecze",
    exact:true,
    component:InComing
   },
    {
   path:"/Wyniki",
   exact:true,
   component:Score
    },
    {
        path:"/Druzyny",
        exact:true,
        component:Teams
         },
         {
            path:"/Team/Players/:TeamId",
            exact:true,
            render: props=> <TeamSelected/>
           },
   {
    path:"/addLastscore",
    exact:true,
    render: props => <RouteController component={AddLastscore} {...props} />
   },
   {
    path:"/addIncoming",
    exact:true,
    render: props => <RouteController component={Addincoming} {...props} />
   },
   {
    path:"/addPosts",
    exact:true,
    render: props => <RouteController component={AddPost} {...props} />
   },
   {
    path:"/addTeams",
    exact:true,
    render: props => <RouteController component={AddTeam} {...props} />
   },
   {
    path:"/addPlayers",
    exact:true,
    render: props => <RouteController component={Players} {...props} />
   },
   
]

export default routes