export const getTasks = () => {
  return fetch("http://localhost:3000/tasks")
    .then(r => r.json())
}

export const addTask = (taskObj) => {
  // const taskObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}


export const getBoards = () => {
  return fetch("http://localhost:3000/boards")
    .then(r => r.json())
}

