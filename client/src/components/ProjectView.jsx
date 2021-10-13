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
            allData: undefined,
            currentSelection: window.location.pathname.split('/').at(-1),
        };
    };

    //BROKEN - LIKELY NEEDS TO BE ASYNC AWAIT
    componentDidMount = () => {
        const id = this.state.user.sub.split('|')[1]
        fetch(`http://localhost:8000/api/user/${id}`, {
            method: "GET",
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({allData: data})
            })
            .catch((err) => {
                console.error(err);
            });
    };
    componentDidUpdate = () => {
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

        const column = this.state.allData.Projects[this.state.currentSelection].columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newOrder = {
            ...this.state.allData.Projects[this.state.currentSelection],
            columns: {
                ...this.state.allData.Projects[this.state.currentSelection].columns,
                [newColumn.id]: newColumn,
            },
        };

        const projectUpdate = {
            ...this.state.allData.Projects,
            ...newOrder
        }

        const newState = {
            ...this.state.allData,
            Projects: {
                ...projectUpdate
            }
        }
        console.log(newState);
        this.setState({ allData: newState });
    };
    render() {
        return (
            <>
                {this.state.allData ? (
                <div className="projectView">
                    <ProjectNav projects={this.state.allData} />
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
                ) : (
                <div className="loaderContainer">
                    <div className="loader"></div>
                </div>
                )}
            </>
        );
    }
}

export default withRouter(ProjectView);
