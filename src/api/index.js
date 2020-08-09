export const getTasks = (id) => {
  return fetch(`http://localhost:3000/tasks?board_id=${id}`,{
    credentials: "include"
  })
    .then(r => r.json())
}

export const addTask = (taskObj) => {
  // const taskObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/tasks", {
    method: "POST",
    credentials: "include",
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

export function updateTask(id, body){
  return fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
}

export function deleteTask(id) {
  return fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(r => r.json())
}


export const getBoards = () => {
  return fetch("http://localhost:3000/boards", {
    credentials: "include"
  })
    .then(r => r.json())
}


export const getCategories = (id) => {
  return fetch(`http://localhost:3000/categories?board_id=${id}`,{
    credentials: "include"
  })
    .then(r => r.json())
}



// =====================
// user fetches
// =====================
export function signUp(username, password){
  console.log("from the api file", username, password)
  return fetch("http://localhost:3000/users", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    // body: JSON.stringify({signUpInput})
    body: JSON.stringify({username, password})
  })
  .then(r => r.json())
}

export function login(username, password){
  return fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    // body: JSON.stringify({loginInput})
    body: JSON.stringify({username, password})
  })
  .then(r => r.json())
}

export function autoLogin(){
  return fetch("http://localhost:3000/autologin", {
    credentials: "include" // tells browser to send cookies with fetch req
  })
  .then(r => {
    if (r.ok) {
      return r.json()
    }
    else{
      throw Error("Not logged in!")
    }
  })
}

export function logout(){
  return fetch("http://localhost:3000/logout", {
    credentials: "include"
  })
  .then(r => r.json())
}
