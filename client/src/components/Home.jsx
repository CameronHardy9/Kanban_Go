import React from "react";
import {LoginButton, LogoutButton} from "./Auth0Button";


class Home extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <h1>Kanban Go</h1>
                <LoginButton />
                <LogoutButton />
            </div>
        );
    }
}

export default Home;