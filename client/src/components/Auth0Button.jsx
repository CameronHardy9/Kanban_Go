import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Sign In / Create Account</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();
    return <button onClick={() => logout()}>Sign Out</button>;
};


export {LoginButton, LogoutButton};
