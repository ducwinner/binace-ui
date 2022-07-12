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
import CoinDetail from "../pages/Detail"
import FortFolio from "../pages/FortFolio"

interface Router {
    path: string
    component: any
    layout?:  any
}

const publicRouter: Router[] = [
    {path: "/", component: Home},
    {path: "/market", component: ListCoin},
    {path: "/profile", component: Profile},
    {path: "/fortfolio", component: FortFolio},
    {path: "/detail/:id", component: CoinDetail},
    {path: "/upLoad", component: UpLoad, layout: HeaderOnly},
    {path: "/noLayout", component: NoLayout, layout: null},
    {path: "/login", component: Login, layout: AuthenLayout},
    {path: "/register", component: Register, layout: AuthenLayout},
]

const privateRouter: Router[] = [
    
]

export {publicRouter, privateRouter} 