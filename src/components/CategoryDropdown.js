import React from 'react'
import { Dropdown } from 'semantic-ui-react'



const CategoryDropdown = ({ categories }) => {

  const categoryOptions = categories.map(c =>( {key: c.id, text: c.name, value: c.id,}))
  


  

  return(
    <Dropdown
    placeholder='Select Category'
    fluid
    selection
    options={categoryOptions}
    />
  )
  }

export default CategoryDropdown