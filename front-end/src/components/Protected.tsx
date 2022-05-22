import { Navigate } from "react-router-dom"
import { ReactNode } from 'react'

type ProtectedProps = {
    children: ReactNode
}

const Protected = ({ children }: ProtectedProps) => {
    var auth = false
    if (auth) {
        return <>{children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}

export default Protected