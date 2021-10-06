import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectView from "./components/ProjectView.jsx";

function App() {
    const { isAuthenticated, user } = useAuth0();
    return (
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
                    <Link exact to="/">Home</Link>
                    <h1>Loading...</h1>
                </>
            )}
        </Switch>
    );
}

export default App;
