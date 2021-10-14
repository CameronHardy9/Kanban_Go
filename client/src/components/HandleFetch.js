async function HandleFetch(method, id, body, email) {
    
    if (!body && method === "PUT") {
        body = {
            "_id": id,
            "User": {
                "email": email
            },
            "Projects": {
                "New Project": {
                    "tasks": {
                        "id": "task1",
                        "task": "New Task",
                        "details": "Insert details here..."
                    },
                    "columns": {
                        "column1": {
                            "id": "column1",
                            "title": "New Column",
                            "taskIds": ["task1"]
                        }
                    },
                    "columnOrder": ["column1"]
                }
            }
        }
    }
    

    let response = await fetch(`http://localhost:8000/api/user/${id}`, {
            method: `${method}`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        })
        let data = await response.json();
        return data;
}

export default HandleFetch;