import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

const GuestHeader = () => {
    return (
        <Navbar bg="light">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    DictApp
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-between">
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Dashboard
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/profile">
                            Profile
                        </Nav.Link>
                        <Nav.Link as={Link} to="/logout">
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default GuestHeader
