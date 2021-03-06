// =====================
// task fetches
// =====================
export const getTasks = (id) => {
  return fetch(`http://localhost:3000/tasks?board_id=${id}`,{
    credentials: "include"
  })
    .then(r => r.json())
}

export const getCurrentTask = (id) => {
  return fetch(`http://localhost:3000/tasks/${id}`,{
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

export function updatePosition(id, body){
  return fetch(`http://localhost:3000/tasks/${id}/position`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
}

// =====================
// board fetches
// =====================
export const getBoards = () => {
  return fetch("http://localhost:3000/boards", {
    credentials: "include"
  })
    .then(r => r.json())
}

export const addBoard = (boardObj) => {
  // const boardObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/boards", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boardObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

export const getMembers = (id) => {
  return fetch(`http://localhost:3000/memberships?board_id=${id}`, {
    credentials: "include"
  })
    .then(r => r.json())
}

export const addMember = (memberObj) => {
  // const memberObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/memberships", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

// =====================
// category fetches
// =====================
export const getCategories = (id) => {
  return fetch(`http://localhost:3000/categories?board_id=${id}`,{
    credentials: "include"
  })
    .then(r => r.json())
}

export const addCategory = (categoryObj) => {
  // const categoryObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/categories", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

export function updateCategory(id, body){
  return fetch(`http://localhost:3000/categories/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
}

// =====================
// comment fetches
// =====================
export const getComments = (taskId) => {
  return fetch(`http://localhost:3000/comments?task_id=${taskId}`,{
    credentials: "include"
  })
    .then(r => r.json())
}

// export const getAllComments = () => {
//   return fetch(`http://localhost:3000/comments`,{
//     credentials: "include"
//   })
//     .then(r => r.json())
// }

export const addComment = (commentObj) => {
  // const commentObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/comments", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

export function updateComment(id, body){
  return fetch(`http://localhost:3000/comments/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
}

export function deleteComment(id) {
  return fetch(`http://localhost:3000/comments/${id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
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

// =====================
// attachment fetches
// =====================

export const getAttachments = (taskId) => {
  return fetch(`http://localhost:3000/attachments?task_id=${taskId}`,{
    credentials: "include"
  })
    .then(r => r.json())
}

// export const getAllAttachments = () => {
//   return fetch(`http://localhost:3000/attachments`,{
//     credentials: "include"
//   })
//     .then(r => r.json())
// }

export const addAttachment = (attachmentObj) => {
  // const attachmentObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/attachments", {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(attachmentObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

export function updateAttachment(id, body){
  return fetch(`http://localhost:3000/attachments/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(r => r.json())
}

export function deleteAttachment(id) {
  return fetch(`http://localhost:3000/attachments/${id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(r => r.json())
}


// =====================
// label fetches
// =====================

export const getLabels = (id) => {
  return fetch(`http://localhost:3000/labels?board_id=${id}`, {
    credentials: "include"
  })
    .then(r => r.json())
}

export const addLabel = (labelObj) => {
  // const labelObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/labels", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(labelObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

// =====================
// taskLabel fetches
// =====================

export const getTaskLabels = (taskId) => {
  return fetch(`http://localhost:3000/task_labels?task_id=${taskId}`,{
    credentials: "include"
  })
    .then(r => r.json())
}

export const addTaskLabel = (taskLabelObj) => {
  // const labelObj = {name, due_date, category_id, created_by}
  return fetch("http://localhost:3000/task_labels", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskLabelObj)
  })
    .then(r => r.json().then(data => {
      if (r.ok) return data
      throw data
    }))
}

export function deleteTaskLabel(id) {
  return fetch(`http://localhost:3000/task_labels/${id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(r => r.json())
}


export const getAllTaskLabels = (boardId) => {
  return fetch(`http://localhost:3000/task_labels/?board_id=${boardId}`,{
    credentials: "include"
  })
    .then(r => r.json())
}