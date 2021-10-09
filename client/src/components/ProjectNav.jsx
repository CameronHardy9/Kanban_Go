import React from "react";
import { Link } from "react-router-dom";

class ProjectNav extends React.Component {
    render() {
        return (
            <div className="projectNav">
                <details>
                    <summary>My Projects</summary>
                    <ul>
                        {Object.keys(this.props.projects).map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/app/${item}`}>{item}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </details>
            </div>
        );
    }
}

export default ProjectNav;
