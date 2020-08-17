import React from 'react'
import { Dropdown } from 'semantic-ui-react'



const AssigneeDropdown = ({ members, currentAssignee, handleSelect}) => {

// const avatarNames = [
//   "joe", "jenny", "steve", "elliot", "stevie", "christian", "matt", "rachel", "lindsay", "veronika", "tom", "helen", "daniel", "lena", "mark", "molly"
// ]

// const rand = Math.floor(Math.random() * (avatarNames.length -1))

  const assigneeOptions = members.map(m =>( {key: m.id, text: m.username, value: m.username, image: { avatar: true, src: `https://react.semantic-ui.com/images/avatar/small/${m.avatar}.jpg` },}))


  return(
    <Dropdown
    clearable
    placeholder='Select member to assign'
    selection
    options={assigneeOptions}
    defaultValue={currentAssignee || null}
    onChange={(e, {value}) => handleSelect(value)}
    />
  )
  }

export default AssigneeDropdown