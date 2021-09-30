import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import NewUser from "./components/NewUser.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./components/Auth0Button";

function App() {
    const { isAuthenticated, user } = useAuth0();
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/newUser">
                <NewUser />
            </Route>
            {isAuthenticated ? (
                <Route path="/loggedin">
                    <LogoutButton />
                    <p>{JSON.stringify(user.name)}</p>
                </Route>
            ) : (
                <div>
                    <h1>You are not logged in!</h1>
                    <Link exact to='/'>Return to home page</Link>
                </div>
            )}
        </Switch>
    );
}

export default App;
