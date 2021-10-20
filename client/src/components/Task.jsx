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
                    ref={provided.innerRef}
                    className="task">
                        <button className="buttons deleteTask" onClick={() => this.props.handleDeleteTask()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <h4>{this.props.task.task}</h4>
                        <p>{this.props.task.details}</p>
                    </li>
                )}
            </Draggable>
        );
    }
}

export default Task;
