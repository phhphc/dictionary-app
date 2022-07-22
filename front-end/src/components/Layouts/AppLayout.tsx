import UserHeader from 'components/Header/UserHeader';

import { LayoutProps } from '.'

const AppLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <UserHeader />

            {children}
        </>
    )
}

export default AppLayout
