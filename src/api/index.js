export const getTasks = () => {
  return fetch("http://localhost:3000/tasks")
    .then(r => r.json())
}