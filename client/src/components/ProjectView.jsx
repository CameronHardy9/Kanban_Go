import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.userInfo,
            cards: [
                {
                    id: 1,
                    title: "Task 1",
                    details: "Some details here",
                },
                {
                    id: 2,
                    title: "Task 2",
                    details: "Some other details here",
                },
                {
                    id: 3,
                    title: "Task 3",
                    details: "Some other kinds of details here",
                },
                {
                    id: 4,
                    title: "Task 4",
                    details: "Last bit of details details here",
                },
            ],
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
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="dropZone1">
                            {(provided) => (
                                <ul
                                    className="dragItems"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {this.state.cards.map(
                                        ({ id, title, details }, index) => {
                                            return (
                                                <Draggable
                                                    key={id}
                                                    draggableId={String(id)}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <li
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <span>{title}</span>
                                                            <p>{details}</p>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </>
        );
    }
}

export default ProjectView;
