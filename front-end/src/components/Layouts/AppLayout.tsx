
import Header from "components/Header";

import { LayoutProps } from '.';

const AppLayout = ({ children }: LayoutProps) => {
    return (<>
        <Header></Header>

        {children}

    </>)
}

export default AppLayout;