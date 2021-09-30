import React from "react";
import { Link } from "react-router-dom";

class NewUser extends React.Component {
    constructor(){
        super();
    }
    render() {
        return(
            <div>
                <h1>NewUser</h1>
                <Link exact to="/">Back</Link>
            </div>
        )
    }
}

export default NewUser;