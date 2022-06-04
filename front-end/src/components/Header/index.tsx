import { useAppSelector } from 'app/hooks'
import { Link } from 'react-router-dom'

import style from './header.module.scss'
import SearchBar from 'components/SearchBar'
import ThemeToggle from 'components/ThemeToggle'

const Header = () => {
    const user = useAppSelector((state) => state.auth.user)

    return (
        <header className={style.wrapper}>
            <div className={style.navBlock}>
                <Link to="/" className={style.navBrand}>
                    DictApp
                </Link>

                {user && (
                    <>
                        <Link className={style.navItem} to="/">
                            Dashboard
                        </Link>
                    </>
                )}
            </div>

            {user && (
                <div className={style.navBlock}>
                    <SearchBar />
                </div>
            )}

            <div className={style.navBlock}>
                <ThemeToggle />

                {user ? (
                    <>
                        <Link className={style.navItem} to="/profile">
                            Profile
                        </Link>

                        <Link className={style.navItem} to="/logout">
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className={style.navItem} to="/login">
                            Login
                        </Link>

                        <Link className={style.navItem} to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
