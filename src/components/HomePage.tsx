import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    return (
        <Container className="text-center bg-light rounded mt-5 p-5">
            <Row>
                <Col>
                    <Image 
                        src="../src/assets/home-page-image.jpg" 
                        alt="Productivity Illustration" 
                        fluid 
                        className="mb-4" 
                    />
                    <h1>Welcome to Your Task Manager{user ? `, ${user.given_name}!` : '!'}</h1>
                    <p className="lead mt-3">
                        Stay Organized, Stay Focused. Your tasks, simplified.
                    </p>
                    <Row className="justify-content-md-center mt-4">
                        <Col md={4} className="text-start">
                            <ul className="list-unstyled">
                                <li>✔️ Easy Task Management</li>
                                <li>✔️ Customizable Deadlines</li>
                                <li>✔️ Real-Time Updates</li>
                                <li>✔️ Seamless Workflow</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {isAuthenticated? 
            <Row className="mt-3 justify-content-md-center">
                <Col md={2}><Button className='btn btn-primary' onClick={()=>navigate('/tasks/')}>View Tasks</Button></Col>
                <Col md={2}><Button className='btn btn-primary' onClick={()=>navigate('/add-task/')}>Add New Task</Button></Col>
                <Col md={2}><LogoutButton/></Col>
            </Row>: 
            <div className='mt-3'><LoginButton/></div>}
            
        </Container>
    );
}

export default HomePage;
