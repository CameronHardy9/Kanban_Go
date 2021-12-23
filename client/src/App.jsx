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
    const [saveQueue, setSaveQueue] = useState(0);

    useEffect(() => {
        console.log(user);
        if (user) {
            storage.set("KanbanGoAuth", user);
        }
        setUserInfo(storage.get("KanbanGoAuth"));
    }, [user]);

    const handleUserUpdate = (status) => {
        if (status === false) {
            setSaveQueue(saveQueue + 1)
        } else if (status === true) {
            setSaveQueue(saveQueue - 1)
        } else {
            console.error("Something went wrong while saving changes.")
        }
    };

    return (
        <>
            {userInfo ? (
                <NavBar
                    userInfo={storage.get("KanbanGoAuth")}
                    contentSaved={saveQueue}
                />
            ) : (
                <NavBar />
            )}
            <Switch>
                <Route exact path="/">
                    {userInfo ? <Redirect to="/app" /> : <Home />}
                </Route>
                <Route path="/app">
                    {userInfo ? (
                        <ProjectView userInfo={storage.get("KanbanGoAuth")} update={handleUserUpdate} />
                        ) : (
                        <div className="loaderContainer">
                            <div className="loader"></div>
                        </div>
                    )}
                </Route>
            </Switch>
            <h1 className="screenSizeWarning">This application currently only supports a screen size wider than 700px.</h1>
        </>
    );
}

export default App;
