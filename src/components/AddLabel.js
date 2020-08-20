import React, { useState, useEffect } from 'react'
import { Label, Input, Button, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTaskLabels, addTaskLabelAction, deleteTaskLabelAction } from '../store/task/actions'
import { addLabelAction } from '../store/label/actions'

const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
]

const AddLabel = ({taskId}) => {

    const currentBoard = useSelector(state => state.board.currentBoard)
    const labels = useSelector(state => state.label.labels)
    // const taskLabels = useSelector(state => state.label.taskLabels)
    const taskLabels = useSelector(state => state.task.currentTask.taskLabels)

    const filteredLabels = taskLabels.map(tl => {
      return labels.find(label => label.id === tl.label_id)
    })

    const unFilteredLabels = labels.filter(label => {
      return !taskLabels.find(tl => label.id === tl.label_id)})
  
    // const [isChecked, setIsChecked] = useState({...defaultLabelCheck})



    // {taskLabels.map(label =>  <Label color={label.color} key={label.id} onClick={() => handleAddLabel(label.id)}>
    // { taskLabels.find(l => l.id === label.id) && <Icon name="check"/>}
    // {label.name}
    // </Label>)}

    // const uncheckedLabels = labels.filter(label => )

    const dispatch = useDispatch()
    const [checkedColor, setCheckedColor] = useState("teal")
    const [nameInput, setnameInput] = useState("")
    const [isCreateOpen, setIsCreateOpen] = useState(false)
     
  // useEffect(() => {
  //   fetchTaskLabels(taskId)

  // }, [labels])

  const handleColorClick = (color) => {
    console.log("checkedColor", checkedColor)
    
    if (checkedColor !== color){
      setCheckedColor(color)
    }
  }

  const handleInputChange = (e) => {
    
      e.persist()
      setnameInput(e.target.value)
    console.log(nameInput)


  }

  const handleButtonClick = (color) => {
    console.log(checkedColor)
    console.log("CLICKLY")
    console.log(taskId)
    console.log(color)
    console.log(currentBoard)
    const body = {
      color: checkedColor,
      name: nameInput,
      board_id: currentBoard.id,
      task_id: taskId
    }
    console.log(body)
    dispatch(addLabelAction(body))
    
  }

  const handleAddLabel = (labelId) => {
    console.log(labelId)
    if (!taskLabels.find(taskLabel => taskLabel.label_id === labelId)){
      console.log("hey")
      dispatch(addTaskLabelAction({task_id: taskId, label_id: labelId}))
    }
  }

  const handleRemoveLabel = (labelId) => {
    // find taskLabel based on labelId
    const taskLabel = taskLabels.find(taskLabel => taskLabel.label_id === labelId)
    const taskLabelId = taskLabel.id
    if (taskLabelId){
      dispatch(deleteTaskLabelAction(taskLabelId))
    }
}

const handlePlusClick = () => {
  setIsCreateOpen(!isCreateOpen)
}

  return(
    <div>
      Add an existing label:
     <br />
     {filteredLabels.map(label =>  <Label color={label.color} key={label.id} onClick={() => handleRemoveLabel(label.id)}>
     <Icon name="check"/>
     {label.name}
     </Label>)}
     {unFilteredLabels.map(label =>  <Label color={label.color} key={label.id} onClick={() => handleAddLabel(label.id)}>
     {label.name}
     </Label>)}
     <br />
<br />
     <Button 
        icon={isCreateOpen ? 'close' : 'plus' }
        onClick={null}
        content={isCreateOpen ? "Close create label form" : "Create new label" }
        onClick={handlePlusClick}
        />
      {/* <Input name="name" onChange={(e) => handleInputChange}></Input> */}
      {/* <label>Create a new label: </label> */}
      {isCreateOpen && <><br />
      <label for="name">Name:</label>
      <input name="name" autoComplete="off" onChange={handleInputChange}/>
              <br />   
    <label >Color:</label>

    {colors.map((color) => (
      <Label color={color} key={color} onClick={() => handleColorClick(color)}>

        { checkedColor === color && <Icon name="check"/>}
      </Label>
    ))
    }
    <br/>
    <Button onClick={handleButtonClick}>Create</Button>
    </>}
<br />

    </div>
  )

}

export default AddLabel


