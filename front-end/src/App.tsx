import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import './scss/index.scss'
import { publicPages, privatePages, defaultPages } from 'pages'
import Protected from 'components/Protected'
import { getUser } from 'features/auth/authSlice'
import { getDict } from 'features/dict/dictSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const App = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            dispatch(getDict())
        }
    }, [user, dispatch])

    return (
        <Routes>
            {publicPages.map(({ path, Page, Layout }, index) => (
                <Route
                    path={path}
                    key={index}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            ))}

            {privatePages.map(({ path, Page, Layout }, index) => (
                <Route
                    path={path}
                    key={index}
                    element={
                        <Protected>
                            <Layout>
                                <Page />
                            </Layout>
                        </Protected>
                    }
                />
            ))}

            {defaultPages.map(({ path, Page, Layout }, index) => (
                <Route
                    path={path}
                    key={index}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            ))}
        </Routes>
    )
}

export default App
