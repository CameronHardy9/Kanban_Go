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
                                <Task key={task.id} column={this.props.column} task={task} index={index} handleDeleteTask={this.props.handleDeleteTask} handleTaskContentChange={this.props.handleTaskContentChange} />
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
