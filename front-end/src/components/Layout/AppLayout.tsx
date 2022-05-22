import {ReactNode} from 'react';

type AppLayoutProps = {
    children: ReactNode
}
const AppLayout = ({children}:AppLayoutProps) => {
    return (<>
        <h2>App header</h2>

        {children}

    </>)
}

export default AppLayout;