import React from 'react';
import { LogoutButton } from "./Auth0Button";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="navBar">
                <span>Logged in as {this.props.name}</span>
                <LogoutButton />
            </div>
        )
    }
}

export default NavBar;