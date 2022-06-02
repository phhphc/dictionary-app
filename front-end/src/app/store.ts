import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'features/auth/authSlice'
import dictReducer from 'features/dict/dictSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        dict: dictReducer,
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
