import React from "react";
import { LogoutButton } from "./Auth0Button";
import NavBar from "./NavBar";

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userInfo,
        };
    }
    // componentDidMount = () => {
    //     const server = fetch("http://localhost:8080/users", {
    //         method: "POST",
    //         mode: "cors",
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log(JSON.stringify(data));
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    //     return server;
    // };
    render() {
        console.log(this.state.user);
        return (
            <>
                <NavBar name={this.state.user.name} />
                <h1>Project View!</h1>
            </>
        );
    }
}

export default ProjectView;
