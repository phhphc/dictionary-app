import { useState } from 'react'
import { FaSun, FaMoon, FaCircle } from 'react-icons/fa'

import style from './themetoggle.module.scss'

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(
        document.documentElement.getAttribute('data-theme') === 'dark'
    )

    const handleThemeToggle = () => {
        const nextTheme = isDark ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', nextTheme)
        setIsDark(!isDark)
    }

    return (
        <button onClick={handleThemeToggle} className={style.btn}>
            <div className={isDark ? style.sliderDark : style.slider}>
                <FaSun className={style.icon} />
                <FaCircle className={style.thumb} />
                <FaMoon className={style.icon} />
            </div>
        </button>
    )
}

export default ThemeToggle
