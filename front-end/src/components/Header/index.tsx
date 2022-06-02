import { Link } from 'react-router-dom'

import style from './header.module.scss'
import SearchBar from 'components/SearchBar'

const Header = () => {
    return (
        <header className={style.wrapper} >

            <div className={style.navBlock}>
                <div className={style.navBrand}>
                    DictApp
                </div>

                <Link className={style.navItem} to="/">Dashboard</Link>

                <Link className={style.navItem} to="/profile">Profile</Link>
            </div>

            <div className={style.navBlock}>
                <SearchBar />
            </div>

            <div className={style.navBlock}>
                <Link className={style.navItem} to="/login">Login</Link>

                <Link className={style.navItem} to="/logout">Logout</Link>

                <Link className={style.navItem} to="/register">Register</Link>
            </div>

        </header>
    )
}

export default Header
