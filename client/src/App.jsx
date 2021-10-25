import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectView from "./components/ProjectView.jsx";
import NavBar from "./components/NavBar";
import React, { useState, useEffect } from "react";
import storage from "./utils/sessionStorageInterface.js";

function App() {
    const { user } = useAuth0();

    const [userInfo, setUserInfo] = useState(undefined);
    const [contentSaved, setContentSaved] = useState(true);
    useEffect(() => {
        if (user) {
            storage.set("KanbanGoAuth", user);
        }
        setUserInfo(storage.get("KanbanGoAuth"));
    }, [user]);

    const handleContentUpdate = () => {

    }

    return (
        <>
            {userInfo ? (
                <NavBar
                    userInfo={storage.get("KanbanGoAuth")}
                    contentSaved={contentSaved}
                />
            ) : (
                <NavBar />
            )}
            <Switch>
                <Route exact path="/">
                    {userInfo ? <Redirect to="/app" /> : <Home />}
                </Route>
                {userInfo ? (
                    <Route path="/app">
                        <ProjectView userInfo={storage.get("KanbanGoAuth")} contentSaved={handleContentUpdate} />
                    </Route>
                ) : (
                    <div className="loaderContainer">
                        <div className="loader"></div>
                    </div>
                )}
            </Switch>
        </>
    );
}

export default App;
