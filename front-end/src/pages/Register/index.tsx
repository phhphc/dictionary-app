import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'app/hooks'
import { getUser } from 'features/auth/authSlice'
import { register } from 'features/auth/authService'
import { IRegisterData } from 'app/interfaces'

type RegisterForm = IRegisterData & {
    password2: string
}

const Register = () => {
    // declare state
    const [formData, setFormData] = useState<RegisterForm>({
        email: '',
        password: '',
        password2: '',
        name: '',
    })
    const { email, password, password2, name } = formData
    const [formError, setFormError] = useState<string | undefined>(undefined)

    // declare hooks
    const dispath = useAppDispatch()
    const navigate = useNavigate()

    // declase handlers
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        register({ email, password, name })
            .then(() => {
                dispath(getUser())
                navigate('/', { replace: true })
            })
            .catch(setFormError)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {formError && <div>{formError}</div>}

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Your Name:
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </label>

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register
