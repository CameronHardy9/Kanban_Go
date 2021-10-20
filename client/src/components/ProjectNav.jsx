import React from "react";
import { Link } from "react-router-dom";

class ProjectNav extends React.Component {
    handleNewProject = () => {
        //Insert DB connection
        //{
            //Insert empty project structure 
        //}
    }
    render() {
        return (
            <div className="projectNav">
                <details>
                    <summary>My Projects</summary>
                    <ul className="projectNavLinks">
                        {Object.keys(this.props.projects).map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link className="projectLink" to={`/app/${item}`}>{item}</Link>
                                </li>
                            );
                        })}
                        <li><button className="buttons" onClick={this.handleNewProject}>Add new project</button></li>
                    </ul>
                </details>
            </div>
        );
    }
}

export default ProjectNav;
