import React from "react";
import { LogoutButton } from "./Auth0Button";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <div className="navBar">
                <Link className="navTitle" to="/">
                    <h1>Kanban Go</h1>
                </Link>
                {this.props.loggedIn && (
                    <>
                        <span className="loggedInAs">
                            Logged in as {this.props.userInfo.email}
                        </span>
                        <LogoutButton />
                    </>
                )}
            </div>
        );
    }
}

export default NavBar;
