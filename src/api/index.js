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



// =====================
// user fetches
// =====================
export function signUp(username, password){
  console.log("________", username, password)
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
