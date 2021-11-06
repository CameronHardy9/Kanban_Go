import React from "react";
import { Link } from "react-router-dom";

class ProjectNav extends React.Component {
    render() {
        return (
            <div className="projectNav">
                <details>
                    <summary>My Projects</summary>
                    <ul className="projectNavLinks">
                        {Object.keys(this.props.projects).map((item, index) => {
                            return (
                                <li key={index}>
                                    <button onClick={() => this.props.handleDeleteProject()} className="buttons deleteProject">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    <Link className="projectLink" to={`/app/${item}`}>{item}</Link>
                                </li>
                            );
                        })}
                        <li><button className="buttons" onClick={() => this.props.handleNewProject()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></button></li>
                    </ul>
                </details>
            </div>
        );
    }
}

export default ProjectNav;
