import Home from "../pages/Home"
import ListCoin from "../pages/ListCoin"
import Profile from "../pages/Profile"
import UpLoad from "../pages/Upload"
import NoLayout from "../pages/NoLayout"
//layout 
import {HeaderOnly} from "../Layout"
import AuthenLayout from "../Layout/AuthenLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"


interface Router {
    path: string
    component: any
    layout?:  any
}

const publicRouter: Router[] = [
    {path: "/", component: Home},
    {path: "/listcoin", component: ListCoin},
    {path: "/profile", component: Profile},
    {path: "/upLoad", component: UpLoad, layout: HeaderOnly},
    {path: "/noLayout", component: NoLayout, layout: null},
    {path: "/login", component: Login, layout: AuthenLayout},
    {path: "/register", component: Register, layout: AuthenLayout},
]

const privateRouter: Router[] = [
    
]

export {publicRouter, privateRouter} 