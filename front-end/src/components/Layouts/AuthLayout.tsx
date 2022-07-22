import GuestHeader from 'components/Header/GuestHeader'

import { LayoutProps } from '.'

const AuthLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <GuestHeader />

            {children}
        </>
    )
}

export default AuthLayout
