import Header from 'components/Header'

import { LayoutProps } from '.'

const AuthLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header></Header>

            {children}
        </>
    )
}

export default AuthLayout
