import { Navbar, Nav} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons'; // Free Check List Icon
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

function NavBar(){
    const { user, isAuthenticated } = useAuth0();

    return(
        <Navbar>
            <Navbar.Brand href="/" className='mx-2'><FontAwesomeIcon icon={faListCheck} />&nbsp;Task Manager</Navbar.Brand>
            {isAuthenticated&&
                (<>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto text-center">
                            <Nav.Link href="/" className='active'>Home</Nav.Link>
                            <Nav.Link href="/tasks/" className='active'>View Tasks</Nav.Link>
                            <Nav.Link href="/add-task/" className='active'>Add Task</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </>)
            }
            <LoginButton/>
            <LogoutButton/>
            {isAuthenticated && 
            <>
                <img src={user?.picture} className='rounded-circle border border-2 border-secondary mx-2' style={{height:'60px'}} alt={user?.given_name}/>
            </>}
        </Navbar>
    )
}

export default NavBar;