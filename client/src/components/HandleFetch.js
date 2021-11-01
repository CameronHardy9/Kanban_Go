async function HandleFetch(method, id, email, body)  {
    
    if (!body && method === "POST") {
        body = {
            "_id": id,
            "User": {
                "email": email
            },
            "Projects": {
                "New Project": {
                    "tasks": {
                        "task1": {
                            "id": "task1",
                            "task": "New Task",
                            "details": "Add details here..."
                        }
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
    
    try {

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
    } catch (e){
        console.error(e);
    }
}

export default HandleFetch;