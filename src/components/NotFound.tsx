import { Container, Row, Col, Button } from 'react-bootstrap';

function NotFound(){
    return(
        <Container className="text-center mt-5">
            <Row>
                <Col>
                    <h1 className="display-1 text-danger">404</h1>
                    <h2>Page Not Found</h2>
                    <p className="lead">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Button variant="info" href="/" className="mt-3">
                        Go Back Home
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;