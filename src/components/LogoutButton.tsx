// LogoutButton.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton:React.FC = () => {
    const { logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
        logout({
            logoutParams: {
                returnTo: window.location.origin, 
            },
        });
    };

    if(isAuthenticated){
        return(
            <Button className='btn btn-danger' onClick={handleLogout}>Log Out</Button>
        );
    };
    return null;
};

export default LogoutButton;