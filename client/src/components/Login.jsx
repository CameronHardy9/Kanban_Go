import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    constructor(){
        super();
    }
    render() {
        return(
            <div>
                <h1>Login</h1>
                <Link exact to="/">Back</Link>
            </div>
        )
    }
}

export default Login;