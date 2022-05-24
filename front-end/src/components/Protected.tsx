import { Navigate } from "react-router-dom"
import { ReactNode } from 'react'


import { useAppSelector } from "app/hooks"

type ProtectedProps = {
    children: ReactNode
}

const Protected = ({ children }: ProtectedProps) => {
    const { user, isLoading, errorMsg } = useAppSelector(state => state.auth)
    console.log("Protected rerender" )
    if (isLoading) {
        return <>Loading...</>
    } else if (errorMsg) {
        return <>{errorMsg}</>
    }
    else if (user) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}

export default Protected