const TestContent = {
    tasks: {
        "task1": {
            id: "task1",
            task: "Task 1",
            details: "Some details here",
        },
        "task2": {
            id: "task2",
            task: "Task 2",
            details: "Some other details here",
        },
        "task3": {
            id: "task3",
            task: "Task 3",
            details: "Some other kinds of details here",
        },
        "task4": {
            id: "task4",
            task: "Task 4",
            details: "Last bit of details details here",
        },
        "task5": {
            id: "task5",
            task: "Task 5",
            details: "Last bit of details details here",
        },
        "task6": {
            id: "task6",
            task: "Task 6",
            details: "Last bit of details details here",
        },
    },
    columns: {
        "column1": {
            id: "column1",
            title: "Title1",
            taskIds: ["task1", "task2", "task3", "task4"],
        },
        "column2": {
            id: "column2",
            title: "Title2",
            taskIds: ["task5", "task6"]
        }
    },
    columnOrder: ["column1", "column2"],
};

export default TestContent;
