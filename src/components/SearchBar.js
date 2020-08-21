import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Search, } from 'semantic-ui-react'
import { setFilter } from '../store/task/actions'

const SearchBar = () => {

  const tasks = useSelector(state => state.task.tasks)
  const members = useSelector(state => state.board.members)
  const queryState = useSelector(state => state.task.query)

  const [query, setQuery] = useState(queryState)
  const [results, setResults] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    // if query in state gets cleared (by clicking the x by filter icon)
    if (queryState === ""){
      // clear out the search bar
      setQuery("")
    }
  }, [queryState])

const handleSearchChange = (e, {value}) => {
  setQuery(value)
  dispatch(setFilter(value))
  
  if (value.trim()[0] === "@"){
    const filteredMembers = members.filter(member => member.username.toLowerCase().includes(value.slice(1).toLowerCase()))
    setResults(filteredMembers.map(m => ({title: m.username, image: `https://react.semantic-ui.com/images/avatar/small/${m.avatar}.jpg` })))
  }
  else{
    console.log( tasks.filter(t => t.name.toLowerCase().includes(value.toLowerCase())))
    const filtered = tasks.filter(t => {
      return ( t.name.toLowerCase().includes(value.toLowerCase()) ) || ( t.description.toLowerCase().includes(value.toLowerCase()) )
    })
    setResults(filtered.map(t => ({ title: t.name, description: t.description })))
  }
}

  return (
    
        <Search
          placeholder='Search tasks... '

          onResultSelect={(e, data) =>
            {
              let queryStr = data.result.title
              // if its a username (has an image)
              if (data.result.image){
                queryStr = `@${queryStr}`
              }
              setQuery(queryStr) // change it in the search bar
              dispatch(setFilter(queryStr)) // dispatch to redux state
            }
          }
          onSearchChange={handleSearchChange}
          results={results}
          value={query}
        />
  )
}
export default SearchBar