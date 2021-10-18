import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

class Column extends React.Component { 
    render() {
        return (
            <>
                <h2 className="columnTitle">{this.props.column.title}</h2>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <ul
                            className="dragItems"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </>
        );
    }
}

export default Column;
