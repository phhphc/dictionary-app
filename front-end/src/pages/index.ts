import { FunctionComponent } from 'react'

import { LayoutProps, AppLayout, AuthLayout, NoLayout } from 'components/Layouts'

import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import Profile from './Profile'
import NotFound from './NotFound'
import Manage from './Manage'


export interface IPages {
    path: string,
    Page: FunctionComponent,
    Layout: FunctionComponent<LayoutProps>,
}

export const publicPages: IPages[] = [
    { path: '/login', Page: Login, Layout: AuthLayout },
    { path: '/register', Page: Register, Layout: AuthLayout },
]

export const privatePages: IPages[] = [
    { path: '/', Page: Dashboard, Layout: AppLayout },
    { path: '/profile', Page: Profile, Layout: AppLayout },
    { path: '/manage', Page: Manage, Layout: AppLayout },
    { path: '/logout', Page: Logout, Layout: NoLayout },
]

export const defaultPages: IPages[] = [
    { path: '*', Page: NotFound, Layout: NoLayout },
]