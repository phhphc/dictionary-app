import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "app/hooks"
import { getUser } from "features/auth/authSlice"
import { login } from "features/auth/authService"

import { ILoginData } from "app/interfaces"

type LoginForm = ILoginData

const Login = () => {
    // declare state
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    })
    const { email, password } = formData
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
        login(formData)
            .then(() => {
                dispath(getUser())
                navigate("/", {replace: true})
            })
            .catch(setFormError)
    }
    return (<div>

        <form onSubmit={handleSubmit}>
            {formError && <div>{formError}</div>}

            <label>Email:
                <input type="email" name="email" value={email} onChange={handleChange} />
            </label>

            <label>Password:
                <input type="password" name="password" value={password} onChange={handleChange} />
            </label>

            <input type="submit" value="Login" />

        </form>


    </div>)
}

export default Login