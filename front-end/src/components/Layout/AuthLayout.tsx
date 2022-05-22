import { ReactNode } from 'react';

type AuthLayoutProps = {
    children: ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (<>
        <h2>Auth Header</h2>

        {children}

        <h2>Auth footer</h2>

    </>)
}

export default AuthLayout;