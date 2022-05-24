

import Header from 'components/Header';

import { LayoutProps } from '.';

const AuthLayout = ({ children }: LayoutProps) => {

    return (<>
        <Header></Header>

        {children}


        <h2>Auth footer</h2>

    </>)
}

export default AuthLayout;