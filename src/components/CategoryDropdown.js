import React from 'react'
import { Dropdown } from 'semantic-ui-react'



const CategoryDropdown = ({ categories, handleSelect, currentCategory }) => {

  const categoryOptions = categories.map(c =>( {key: c.id, text: c.name, value: c.id}))


  return(
    <Dropdown
    placeholder='Select Category'
    fluid
    selection
    options={categoryOptions}
    defaultValue={currentCategory.id}
    onChange={(e, {value}) => handleSelect(value)}
    />
  )
  }

export default CategoryDropdown