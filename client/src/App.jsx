import { Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectView from "./components/ProjectView.jsx";
import NavBar from "./components/NavBar";
import React, { useState, useEffect } from "react";

function App() {
    const { isAuthenticated, user } = useAuth0();
    const [auth, setAuth] = useState(false);
    const [userInfo, setUserInfo] = useState(undefined);

    useEffect(() => {
        setAuth(isAuthenticated);
        setUserInfo(user);
    }, [isAuthenticated, user])

    return (
        <>
            {auth ? (
                <NavBar auth={auth} email={userInfo.name} />
            ) : (
                <NavBar />
            )}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                {auth ? (
                    <Route path="/app">
                        <ProjectView userInfo={userInfo} />
                    </Route>
                ) : (
                    <>
                        <div className="loader"></div>
                    </>
                )}
            </Switch>
        </>
    );
}

export default App;
