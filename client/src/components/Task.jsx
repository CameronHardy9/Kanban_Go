import React from "react";
import { Draggable } from "react-beautiful-dnd";

class Task extends React.Component {
    render() {
        console.log("Task.jsx")
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
            >
                {(provided) => (
                    <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <h4>{this.props.task.task}</h4>
                        <p>{this.props.task.details}</p>
                    </li>
                )}
            </Draggable>
        );
    }
}

export default Task;
