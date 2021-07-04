import React from "react"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"


const routes = [
    {
        path:'/',
        component: Home
    },
    {
        path:'/login',
        component: Login
    },
    {
        path:'/register',
        component: Register
    },
    {
        path:'/*',
        component:NotFound
    },
]

export default routes