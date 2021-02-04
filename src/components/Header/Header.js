import { useState, useEffect, useContext } from 'react'
import authContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'
import './Header.css'
import '../../styles/colors-palette.css'
import { Container, Col, Row, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import logoclaro from "./../../images/logorecortadoclaro.png"
import logooscuro from "./../../images/logorecortado.png"
import SearchBar from '../SearchBar/SearchBar'
import UserMenu from '../UserMenu/UserMenu'
import LoginForm from '../LoginForm/LoginForm';
import "../../styles/main.css";


const Header = () => {
    const {user}=useContext(authContext);
    const [show, setShow] = useState(false);

        // dayClassLink = 'navbar-link-claro color4';
        // tema='claro'
        // logo = logooscuro;

    return(
        <>
            <LoginForm show={show} setShow={setShow} />
            <Navbar className="flex-column main-navbar" collapseOnSelect expand='sm' bg='light' variant='light'>
                <Container>
                    <Row className="w-100 justify-content-between">
                        <Navbar.Brand className='text-black align-text'>
                            <Link to={user ? '/home' : '/'}>
                                <img
                                    src={logooscuro}
                                    height="60"
                                    alt="Logo"
                                    className="d-inline-block align-top"
                                />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end flex-wrap" id="basic-navbar-nav">
                            <Nav>
                            {
                            user
                                ? (
                                <>
                                    <Nav.Link>
                                        <Link to="/home" className='navbar-link-claro color4'>
                                            Home
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/favourites" className='navbar-link-claro color4'>
                                            Favorites
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/aboutUs" className='navbar-link-claro color4'>
                                            Contact
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/"className='navbar-link-claro color4'>
                                            Help
                                        </Link>
                                    </Nav.Link>
                                    <UserMenu/>
                                </>
                                )
                                : (
                                <button className={'login-button-claro'} onClick={() => setShow(true)}> Log In </button>
                                )
                            }
                            </Nav>
                        </Navbar.Collapse>
                    </Row>
                </Container>
                {
                    user &&
                    (
                        <Row >
                            <Col className="d-flex justify-content-between searchBar">
                                <SearchBar/>
                            </Col>
                        </Row>
                    )
                }
            </Navbar>
        </>
    )
}
export default Header;