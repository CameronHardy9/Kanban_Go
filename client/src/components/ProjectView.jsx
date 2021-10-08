import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TestContent from "./ProjectData";
import Column from "./Column";

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userInfo,
            cards: TestContent,
        };
    }
    // componentDidMount = () => {
    //     const server = fetch("http://localhost:8080/users", {
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

        const column = this.state.cards.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state.cards,
            columns: {
                ...this.state.cards.columns,
                [newColumn.id]: newColumn,
            },
        };

        this.setState({ cards: newState });
    };
    render() {
        return (
            <>
                <div className="projectContent">
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        {this.state.cards.columnOrder.map((columnId) => {
                            const column = this.state.cards.columns[columnId];
                            const tasks = column.taskIds.map(
                                (taskId) => this.state.cards.tasks[taskId]
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
            </>
        );
    }
}

export default ProjectView;
