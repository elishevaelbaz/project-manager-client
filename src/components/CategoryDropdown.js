import React from 'react'
import { Dropdown } from 'semantic-ui-react'



const CategoryDropdown = ({ categories, handleSelect, currentCategoryId }) => {

  const categoryOptions = categories.map(c =>( {key: c.id, text: c.name, value: c.id}))


  return(
    <Dropdown
    placeholder='Select Category'
    selection
    options={categoryOptions}
    defaultValue={currentCategoryId || null}
    onChange={(e, {value}) => handleSelect(value)}
    />
  )
  }

export default CategoryDropdown