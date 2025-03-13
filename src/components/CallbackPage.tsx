import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const CallbackPage: React.FC = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks"); // Redirect to tasks page or dashboard
        }
    }, [isAuthenticated, navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Oops... {error.message}</div>;

    return (
        <Container>
            <h1>Processing login...</h1>
        </Container>
    );
};

export default CallbackPage;
