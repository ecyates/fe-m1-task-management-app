// LoginButton.tsx
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton:React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: { 
                returnTo: '/',
            },
            authorizationParams: {
                prompt: 'login', 
            }
        });
    };

    if (!isAuthenticated){
        return(
            <Button className='btn btn-danger' onClick={handleLogin}>Log In</Button>
        )
    }
    return null;
};

export default LoginButton;