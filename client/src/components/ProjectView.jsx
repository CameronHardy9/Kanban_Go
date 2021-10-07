import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TestContent from "./ProjectData";
import Column from "./Column"

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
        if (!result.destination) return;
        const items = Array.from(this.state.cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        this.setState({ cards: items });
    };
    render() {
        return (
            <>
                <div className="projectContent">
                    {this.state.cards.columnOrder.map((columnId) => {
                        const column = this.state.cards.columns[columnId];
                        const tasks = column.taskIds.map(
                            (taskId) => this.state.cards.tasks[taskId]
                        );
                        return <Column key={columnId} column={column} tasks={tasks} />;
                    })}
                </div>
            </>
        );
    }
}

export default ProjectView;
