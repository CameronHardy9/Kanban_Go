import { Route, Switch } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectView from "./components/ProjectView.jsx";
import NavBar from "./components/NavBar";
import React, { useState, useEffect } from "react";
import storage from "./utils/localStorageInterface.js";
import useForceUpdate from "./utils/forceUpdate.js";

function App() {
    const { user } = useAuth0();

    const [userInfo] = useState(storage.get("KanbanGoAuth"));
    const [loggedIn] = useState(storage.get("loggedIn"));
    //console.log(userInfo.sub.split('|')[1])
    useEffect(() => {
        if (user) {
            storage.set("KanbanGoAuth", user);
            storage.set("loggedIn", true);
        }
    });
    return (
        <>
            {userInfo ? (
                <NavBar loggedIn={loggedIn} userInfo={storage.get("KanbanGoAuth")} />
            ) : (
                <NavBar />
            )}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                {userInfo ? (
                    <Route path="/app">
                        <ProjectView userInfo={storage.get("KanbanGoAuth")} />
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
