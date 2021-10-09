import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Projects from "./ProjectData";
import Column from "./Column";
import ProjectNav from "./ProjectNav";

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userInfo,
            cards: Projects,
        };
    }
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
    handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = this.state.cards.project1.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state.cards.project1,
            columns: {
                ...this.state.cards.project1.columns,
                [newColumn.id]: newColumn,
            },
        };

        this.setState({ cards: newState });
    };
    render() {
        return (
            <>
                <div className="projectView">
                    <ProjectNav projects={Projects}/>
                    <div className="projectSelection">
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            {this.state.cards.project1.columnOrder.map((columnId) => {
                                const column = this.state.cards.project1.columns[columnId];
                                const tasks = column.taskIds.map(
                                    (taskId) => this.state.cards.project1.tasks[taskId]
                                );
                                return (
                                    <Column
                                        key={columnId}
                                        column={column}
                                        tasks={tasks}
                                    />
                                );
                            })}
                        </DragDropContext>
                    </div>
                </div>
            </>
        );
    }
}

export default ProjectView;
