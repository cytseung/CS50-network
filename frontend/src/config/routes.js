// import React from "react"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import Following from "../pages/Following"
import User from "../pages/User"

const routes = [
    {
        path:'/',
        component: Home,
        isPrivate: false,
    },
    {
        path:'/following',
        component: Following,
        isPrivate: true,

    },
    {
        path:'/login',
        component: Login,
        isPrivate: false,
    },
    {
        path:'/register',
        component: Register,
        isPrivate: false,
    },
    {
        path:'/user/:username',
        component: User,
        isPrivate: false,
    },
    
    {
        path:'/*',
        component:NotFound,
        isPrivate: true,
    },
]

export default routes