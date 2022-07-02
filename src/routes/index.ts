import Home from "../pages/Home"
import ListCoin from "../pages/ListCoin"
import Profile from "../pages/Profile"
import UpLoad from "../pages/Upload"
import NoLayout from "../pages/NoLayout"
//layout 
import {HeaderOnly} from "../Layout"


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
    {path: "/noLayout", component: NoLayout, layout: null}
]

const privateRouter: Router[] = [
    
]

export {publicRouter, privateRouter} 