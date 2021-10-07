import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectView from "./components/ProjectView.jsx";
import NavBar from "./components/NavBar";

function App() {
    const { isAuthenticated, user } = useAuth0();
    return (
        <>
            {isAuthenticated ? (
                <NavBar isAuthenticated={isAuthenticated} email={user.name} />
            ) : (
                <NavBar />
            )}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                {isAuthenticated ? (
                    <Route path="/app">
                        <ProjectView userInfo={user} />
                    </Route>
                ) : (
                    <>
                        <Link exact to="/">
                            Home
                        </Link>
                        <h1>Loading...</h1>
                    </>
                )}
            </Switch>
        </>
    );
}

export default App;
