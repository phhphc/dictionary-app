import { FunctionComponent } from 'react'

import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import NotFound from './NotFound'
import Manage from './Manage'


export interface IPages {
    path: string,
    Page: FunctionComponent
}

export const publicPages: IPages[] = [
    { path: '/login', Page: Login },
    { path: '/register', Page: Register },
]

export const privatePages: IPages[] = [
    { path: '/', Page: Dashboard },
    { path: '/profile', Page: Profile },
    { path: '/manage', Page: Manage },
]

export const defaultPages: IPages[] = [
    { path: '*', Page: NotFound },
]