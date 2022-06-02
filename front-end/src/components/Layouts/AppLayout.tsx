import Header from 'components/Header'

import { LayoutProps } from '.'

const AppLayout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header/>

            {children}
        </>
    )
}

export default AppLayout
