import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsEnvelope, BsShieldLock, BsFileLock } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'

import { useAppDispatch } from 'app/hooks'
import { getUser } from 'features/auth/authSlice'
import { register } from 'features/auth/authService'
import { IRegisterData } from 'app/interfaces'
import style from 'scss/auth.module.scss'
import img from "media/img/authPoster.jpg"

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
                            <input type="email" name="email" className={style.formInput} id='email'
                                value={email} onChange={handleChange} />

                            <div className={style.formIcon}><BsEnvelope /></div>
                            <label className={style.formLabel} htmlFor='email'>Email Address</label>
                        </div>

                        <div className={style.formGroup}>
                            <input type="password" name="password" className={style.formInput} id='password'
                                value={password} onChange={handleChange} />

                            <div className={style.formIcon}><BsShieldLock /></div>
                            <label className={style.formLabel} htmlFor='password'>Password</label>
                        </div>

                        <div className={style.formGroup}>
                            <input type="password2" name="password2" className={style.formInput} id='password2'
                                value={password2} onChange={handleChange} />

                            <div className={style.formIcon}><BsFileLock /></div>
                            <label className={style.formLabel} htmlFor='password2'>Confirm Password</label>
                        </div>

                        <div className={style.formGroup}>
                            <input type="text" name="name" className={style.formInput} id='name'
                                value={name} onChange={handleChange} />

                            <div className={style.formIcon}><FaRegUser /></div>
                            <label className={style.formLabel} htmlFor='name'>User Name</label>
                        </div>

                    </div>

                    {formError && <div className={style.formError}>{formError}</div>}

                    <div className={style.formHelper}>
                    </div>

                    <div className={style.formAction}>
                        <Link to='/login'>
                            <input className={style.btn} type="button" value="Login" />
                        </Link>

                        <input className={style.btn + ' ' + style.btnActive} type="submit" value="Create Account" />
                    </div>
                </form>
            </div>


        </div>
    )
}

export default Register
