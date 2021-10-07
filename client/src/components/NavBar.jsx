import React from "react";
import { LogoutButton } from "./Auth0Button";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            email: this.props.email
        }
    }
    render() {
        console.log(this.props.isAuthenticated, this.props.email)
        return (
            <div className="navBar">
                <h1 className="navTitle">Kanban Go</h1>
                {this.props.isAuthenticated && (
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
