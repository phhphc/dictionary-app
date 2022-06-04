import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'app/hooks'
import { getUser } from 'features/auth/authSlice'
import { login } from 'features/auth/authService'
import { BsEnvelope, BsShieldLock } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { ILoginData } from 'app/interfaces'
import style from 'scss/auth.module.scss'
import img from "media/img/authPoster.jpg"

type LoginForm = ILoginData

const Login = () => {
    // declare state
    const [formData, setFormData] = useState<LoginForm>({
        email: '',
        password: '',
    })
    const { email, password } = formData
    const [formError, setFormError] = useState<string | undefined>(undefined)

    // declare hooks
    const dispath = useAppDispatch()
    const navigate = useNavigate()

    // declare handlers
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(formData)
            .then(() => {
                dispath(getUser())
                navigate('/', { replace: true })
            })
            .catch(setFormError)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.block}>
                <img className={style.posterImg} src={img} alt="poster" />
            </div>

            <div className={style.block}>
                <h1 className={style.title}>Welcome to DictApp</h1>
                <p className={style.subtitle}>To keep connect with us please login with
                    your personal infomation by email address and password.</p>

                <form onSubmit={handleSubmit} className={style.formControl}>

                    <div className={style.inputWrapper}>
                        <div className={style.formGroup}>
                            <input type="email" name="email" className={style.formInput} id="name"
                                value={email} onChange={handleChange} />

                            <div className={style.formIcon}><BsEnvelope /></div>
                            <label className={style.formLabel} htmlFor='name'>Email Address</label>
                        </div>

                        <div className={style.formGroup}>
                            <input type="password" name="password" className={style.formInput} id="password"
                                value={password} onChange={handleChange} />

                            <div className={style.formIcon}><BsShieldLock /></div>
                            <label className={style.formLabel} htmlFor="password">Password</label>
                        </div>
                    </div>

                    {formError && <div className={style.formError}>{formError}</div>}

                    <div className={style.formHelper}>
                        <a href='#'>Forgot password ?</a>
                    </div>

                    <div className={style.formAction}>
                        <Link to='/register'>
                            <input className={style.btn} type="button" value="Create Account" />
                        </Link>

                        <input className={style.btn + ' ' + style.btnActive} type="submit" value="Login" />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
