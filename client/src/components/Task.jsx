import React from "react";
import { Draggable } from "react-beautiful-dnd";

class Task extends React.Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
            >
                {(provided) => (
                    <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
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
