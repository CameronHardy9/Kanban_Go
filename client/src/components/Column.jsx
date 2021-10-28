import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

class Column extends React.Component { 
    render() {
        return (
            <>
                <h2 className="columnTitle" contentEditable suppressContentEditableWarning onBlur={(e) => this.props.handleColumnContentChange(e, this.props.column.id)}>{this.props.column.title}</h2>
                <button className="buttons deleteColumn" onClick={() => this.props.handleDeleteColumn(this.props.column.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
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
