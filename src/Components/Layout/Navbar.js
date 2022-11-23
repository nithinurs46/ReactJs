
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBarComponent = (props) => {
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  }
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to='/dashboard'>Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/movies'>OMDB Movies</Nav.Link>
            {/*<Nav.Link as={NavLink} to='/table'>Table</Nav.Link>*/}
            <NavDropdown title="Isro" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to='/isro/customer-satellites'>Customer Satellites</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/isro/centres'>Centres</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to='/tasks'>Show Tasks</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/addTask'>Add Task</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to='/star-wars'>Star Wars</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} to="#">
              Logged in as : {authCtx.userName} {/*location.state.username*/}
            </Nav.Link>
            <Nav.Link onClick={logoutHandler}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;