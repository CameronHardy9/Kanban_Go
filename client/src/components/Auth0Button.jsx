import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button className="loginButton" onClick={() => loginWithRedirect()}>Sign In / Create Account</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();
    return <button className="logoutButton" onClick={() => {
        logout();
        sessionStorage.removeItem("KanbanGoAuth");
    }}>Sign Out</button>;
};


export {LoginButton, LogoutButton};
