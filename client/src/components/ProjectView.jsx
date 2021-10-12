import React from "react";
import { Route, withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Projects from "./ProjectData";
import Column from "./Column";
import ProjectNav from "./ProjectNav";

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userInfo,
            allData: Projects,
            currentSelection: window.location.pathname.split('/').at(-1),
        };
    };
    // componentDidMount = () => {
    //     const server = fetch("http://localhost:8000/user", {
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
    componentDidUpdate = () => {
        console.log("update");
        const present = window.location.pathname.split('/').at(-1);
        if (present !== this.state.currentSelection) {
            this.setState({currentSelection: present})
        }
    };
    handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if(this.state.currentSelection === "app") {
            return;
        }
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.allData[this.state.currentSelection].columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newOrder = {
            ...this.state.allData[this.state.currentSelection],
            columns: {
                ...this.state.allData[this.state.currentSelection].columns,
                [newColumn.id]: newColumn,
            },
        };

        const newState = {
            ...this.state.allData,
            [this.state.currentSelection]: {
                ...newOrder
            }
        }

        this.setState({ allData: newState });
        console.log("update state")
    };
    render() {
        console.log(this.state.currentSelection)
        return (
            <>
                <div className="projectView">
                    <ProjectNav projects={Projects} />
                    <div className="projectSelection">
                            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                                {Object.keys(this.state.allData).map((key, index) => {
                                    const project = this.state.allData[key];
                                    return (
                                        <Route key={index} path={`/app/${key}`}>
                                            {project.columnOrder.map((columnId) => {
                                                const column = project.columns[columnId];
                                                const tasks = column.taskIds.map((taskId) => project.tasks[taskId]);
                                                return(<Column key={columnId} column={column} tasks={tasks} />)
                                            })}
                                        </Route>
                                    );
                                })}
                            </DragDropContext>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(ProjectView);
