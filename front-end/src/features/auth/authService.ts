import axios from 'axios'

import { IRegisterData, ILoginData, IUser } from 'app/interfaces'

// Get user data
export const loadUser = async () => {
    const response = await axios.get('/api/user').catch((err) => {
        throw err.response.data.message || (err.message as string)
    })

    return response.data as IUser
}

// Register User
export const register = async (registerData: IRegisterData) => {
    await axios.post('/api/auth/register', registerData).catch((err) => {
        throw err.response.data.message || (err.message as string)
    })
}

// Login User
export const login = async (loginData: ILoginData) => {
    await axios.post('/api/auth/login', loginData).catch((err) => {
        throw err.response.data.message || (err.message as string)
    })
}

// Logout User
export const logout = async () => {
    await axios.post('/api/auth/logout').catch((err) => {
        throw err.response.data.message || (err.message as string)
    })
}
