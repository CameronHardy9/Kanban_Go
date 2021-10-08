import React from "react";
import { LogoutButton } from "./Auth0Button";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            email: this.props.email,
        };
    }
    render() {
        return (
            <div className="navBar">
                <Link className="navTitle" to="/">
                    <h1>Kanban Go</h1>
                </Link>
                {this.props.auth && (
                    <>
                        <span className="loggedInAs">
                            Logged in as {this.props.email}
                        </span>
                        <LogoutButton />
                    </>
                )}
            </div>
        );
    }
}

export default NavBar;
