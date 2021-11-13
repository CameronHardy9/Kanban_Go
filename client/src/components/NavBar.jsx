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
                {this.props.userInfo && (
                    <>
                        <div className="save">
                            {!this.props.contentSaved ? (
                                <>
                                    <span className="saveText">Saved</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                </>
                            ) : (
                                <>
                                    <span className="saveText">Saving...</span>
                                    <div className="saveLoaderContainer">
                                        <div className="saveLoader"></div>
                                    </div>
                                </>
                            )}
                        </div>
                        <span className="loggedInAs">
                            {this.props.userInfo.email}
                        </span>
                        <LogoutButton />
                    </>
                )}
            </div>
        );
    }
}

export default NavBar;
