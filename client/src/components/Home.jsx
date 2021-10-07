import React from "react";
import {LoginButton, LogoutButton} from "./Auth0Button";


class Home extends React.Component {
    render() {
        return (
            <div className="homeButtons">
                <LoginButton />
                <LogoutButton />
            </div>
        );
    }
}

export default Home;