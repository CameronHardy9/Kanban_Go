import React from "react";
import { Route, withRouter } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import uniqid from "uniqid";
import Column from "./Column";
import ProjectNav from "./ProjectNav";
import HandleFetch from "./HandleFetch";

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userInfo,
            id: props.userInfo.sub.split('|')[1],
            allData: undefined,
            currentSelection: document.URL.split('/').reverse()[0],
        };
    };
    componentDidMount = async () => {
        const getUser = await HandleFetch("GET", this.state.id);
        if(!getUser) {
            await HandleFetch("POST", this.state.id, this.state.user.email);
            const getNewUser = await HandleFetch("GET", this.state.id);
            this.setState({ allData: getNewUser });
        } else {
            this.setState({ allData: getUser });
        }
    };
    componentDidUpdate = () => {
        const present = window.location.pathname.split('/').at(-1);
        if (present !== this.state.currentSelection) {
            this.setState({currentSelection: present})
        }
    };
    handleUserUpdate = async (newState) => {
        this.props.update(false)
        this.setState({ allData: newState });
        const result = await HandleFetch("PUT", this.state.id, this.state.user.email, newState);
        if (result.acknowledged) {
            this.props.update(result.acknowledged);
        } else {
            console.error("Something went wrong while saving changes!\nExpected 'true', but received: ", result.acknowledged, ".");
        }
    };
    handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        const decodedSelection = decodeURIComponent(this.state.currentSelection)

        if(decodedSelection === "app") {
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

        const start = this.state.allData.Projects[decodedSelection].columns[source.droppableId];
        const finish = this.state.allData.Projects[decodedSelection].columns[destination.droppableId];
        
        //Moving within same column
        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
    
            const newOrder = {
                ...this.state.allData.Projects[decodedSelection],
                columns: {
                    ...this.state.allData.Projects[decodedSelection].columns,
                    [newColumn.id]: newColumn,
                },
            };
    
            const projectUpdate = {
                ...this.state.allData.Projects,
                [decodedSelection]: newOrder
            }
    
            const newState = {
                ...this.state.allData,
                Projects: {
                    ...projectUpdate
                }
            }
            this.handleUserUpdate(newState);
        } else {
            //Moving across columns
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };
    
            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };
    
            const newColumns = {
                ...this.state.allData.Projects[decodedSelection],
                columns: {
                    ...this.state.allData.Projects[decodedSelection].columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };
    
            const projectUpdate = {
                ...this.state.allData.Projects,
                [decodedSelection]: newColumns
            };
    
            const newState = {
                ...this.state.allData,
                Projects: {
                    ...projectUpdate
                }
            };
            this.handleUserUpdate(newState);
        }
    };
    handleDeleteProject = (project) => {
        const newState = {...this.state.allData};

        delete newState.Projects[project];

    this.handleUserUpdate(newState);
    }
    handleNewProject = () => {
        const newProjectName = prompt("Give your new project a name.\n\nCan only include the following characters:\n[ A-Z, a-z, 0-9, _ , - ].");
        const taskId = uniqid();
        const columnId = uniqid();
        const regex1 = /[^\w -]/g;
        const regex2 = /\S/g;
        const currentProjects = _.keysIn(this.state.allData.Projects)
        
        if(currentProjects.includes(newProjectName)) {
            alert("Project name already exists!\n\nPlease choose a unique name.");
            return;
        }

        if(newProjectName && !(newProjectName.match(regex1)) && !!(newProjectName.match(regex2))) {
            const newState = {
                ...this.state.allData,
                Projects: {
                    ...this.state.allData.Projects,
                    [newProjectName]: {
                        tasks: {
                            [taskId]: {
                                id: taskId,
                                task: "New Task",
                                details: "Add details here..."
                            }
                        },
                        columns: {
                            [columnId]: {
                                id: columnId,
                                title: "New Column",
                                taskIds: [taskId]
                            }
                        },
                        columnOrder: [columnId]
                    }
                }
            }
            this.handleUserUpdate(newState);
        } else {
            alert("Please try again with valid input!");
        }
    }
    handleAddTask = (column) => {
        const decodedSelection = decodeURIComponent(this.state.currentSelection);
        const id = uniqid();

        const newState = {
            ...this.state.allData,
            Projects: {
                ...this.state.allData.Projects,
                [decodedSelection]: {
                    ...this.state.allData.Projects[decodedSelection],
                    tasks: {
                        ...this.state.allData.Projects[decodedSelection].tasks,
                        [id]: {
                            id: id,
                            task: "New task...",
                            details: "Add details here..." 
                        }
                    },
                    columns: {
                        ...this.state.allData.Projects[decodedSelection].columns,
                        [column]: {
                            ...this.state.allData.Projects[decodedSelection].columns[column],
                            taskIds: [
                                ...this.state.allData.Projects[decodedSelection].columns[column].taskIds,
                                id
                            ]
                        }
                    }
                }
            }

        };
    this.handleUserUpdate(newState);
    };
    handleDeleteTask = (task, column) => {
        const decodedSelection = decodeURIComponent(this.state.currentSelection);
        let newState = {...this.state.allData};
        let taskSelect = newState.Projects[decodedSelection].tasks;
        let columnSelect = newState.Projects[decodedSelection].columns[column];
        
        columnSelect.taskIds.splice(columnSelect.taskIds.indexOf(task), 1);
        delete taskSelect[task];
        
    this.handleUserUpdate(newState);
    }
    handleTaskContentChange = (e) => {
        const decodedSelection = decodeURIComponent(this.state.currentSelection);
        const id = e.target.parentElement.dataset.rbdDraggableId;
        const task = e.target.parentElement.getElementsByTagName("h4")[0].innerText;
        const details = e.target.parentElement.getElementsByTagName("p")[0].innerText;

        const newState = {
            ...this.state.allData,
            Projects: {
                ...this.state.allData.Projects,
                [decodedSelection]: {
                    ...this.state.allData.Projects[decodedSelection],
                    tasks: {
                        ...this.state.allData.Projects[decodedSelection].tasks,
                        [id]: {
                            id: id,
                            task: task,
                            details: details 
                        }
                    }
                }
            }

        };

    this.handleUserUpdate(newState);
    };
    handleColumnContentChange = (e, id) => {
        const decodedSelection = decodeURIComponent(this.state.currentSelection);
        const title = e.target.innerText;
        
        const newState = {
            ...this.state.allData,
            Projects: {
                ...this.state.allData.Projects,
                [decodedSelection]: {
                    ...this.state.allData.Projects[decodedSelection],
                    columns: {
                        ...this.state.allData.Projects[decodedSelection].columns,
                        [id]: {
                            id: id,
                            title: title,
                            taskIds: [
                                ...this.state.allData.Projects[decodedSelection].columns[id].taskIds
                            ]
                        }
                    }
                }
            }
        };

    this.handleUserUpdate(newState);
    };
    handleAddColumn = () => {
        const decodedSelection = decodeURIComponent(this.state.currentSelection);
        const taskId = uniqid();
        const columnId = uniqid();


        const newState = {
            ...this.state.allData,
            Projects: {
                ...this.state.allData.Projects,
                [decodedSelection]: {
                    ...this.state.allData.Projects[decodedSelection],
                    tasks: {
                        ...this.state.allData.Projects[decodedSelection].tasks,
                        [taskId]: {
                            id: taskId,
                            task: "New task...",
                            details: "Add details here..." 
                        }
                    },
                    columns: {
                        ...this.state.allData.Projects[decodedSelection].columns,
                        [columnId]: {
                            id: columnId,
                            title: "New Column",
                            taskIds: [taskId]
                        }
                    },
                    columnOrder: [...this.state.allData.Projects[decodedSelection].columnOrder, columnId]
                }
            }
        };
        
    this.handleUserUpdate(newState);
    };
    handleDeleteColumn = (columnId) => {
        const decodedSelection = decodeURIComponent(this.state.currentSelection);
        let newState = {...this.state.allData};
        let allTasks = newState.Projects[decodedSelection].tasks
        let selectedTaskIds = newState.Projects[decodedSelection].columns[columnId].taskIds;
        let columnOrder = newState.Projects[decodedSelection].columnOrder;
        let columns = newState.Projects[decodedSelection].columns;

        for (const entry in allTasks) {
            if (selectedTaskIds.includes(entry)) {
                delete allTasks[entry];
            }
        }

        columnOrder.splice(columnOrder.indexOf(columnId), 1);
        delete columns[columnId]

    this.handleUserUpdate(newState);
    };
    render() {
        return (
            <>
                {this.state.allData ? (
                <div className="projectView">
                    <ProjectNav projects={this.state.allData.Projects} handleNewProject={this.handleNewProject} handleDeleteProject={this.handleDeleteProject} />
                    <div className="projectSelection">
                            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                                {Object.keys(this.state.allData.Projects).map((key, index) => {
                                    const project = this.state.allData.Projects[key];
                                    return (
                                        <Route key={index} path={`/app/${key}`}>
                                            {project.columnOrder.map((columnId) => {
                                                const column = project.columns[columnId];
                                                const tasks = column.taskIds.map((taskId) => project.tasks[taskId]);
                                                return(
                                                    <div key={columnId} className="allColumns">
                                                        <Column column={column} tasks={tasks} handleDeleteColumn={this.handleDeleteColumn} handleDeleteTask={this.handleDeleteTask} handleColumnContentChange={this.handleColumnContentChange} handleTaskContentChange={this.handleTaskContentChange}/>
                                                        <button className="addTask" onClick={() => this.handleAddTask(column.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
                                                    </div>
                                                )})}
                                                <button className="addColumn" onClick={() => this.handleAddColumn()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg></button>
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
