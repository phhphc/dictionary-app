import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <br />
            <Link to="/">Dashboard</Link>
            <br />
            <Link to="/login">Login</Link>
            <br />
            <Link to="/logout">Logout</Link>
            <br />
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Header
