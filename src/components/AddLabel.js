import React, { useState } from 'react'
import { Label, Button, Icon } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskLabelAction, deleteTaskLabelAction } from '../store/task/actions'
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

    const dispatch = useDispatch()
    const [checkedColor, setCheckedColor] = useState("teal")
    const [nameInput, setNameInput] = useState("")
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
    setNameInput(e.target.value)
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
    setNameInput("") 
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
      Labels:
      <br />
     {filteredLabels.map(label =>  <Label color={label.color} key={label.id} onClick={() => handleRemoveLabel(label.id)}>
     <Icon name="check"/>
     {label.name}
     </Label>)}
     <br />
      Add an existing label:
     <br />
     {unFilteredLabels.map(label =>  <Label color={label.color} key={label.id} onClick={() => handleAddLabel(label.id)}>
     {label.name}
     </Label>)}
     <br />
<br />
     <Button 
        icon={isCreateOpen ? 'minus' : 'plus' }
        onClick={null}
        content="Create new label"
        onClick={handlePlusClick}
        className="margin-bottom"
        />
      {/* <Input name="name" onChange={(e) => handleInputChange}></Input> */}
      {/* <label>Create a new label: </label> */}
      {isCreateOpen && <><div class="margin-bottom"><br />
      <label for="name">Name:</label>
      <input name="name" autoComplete="off" value={nameInput} onChange={handleInputChange}/>
              <br />   
              </div>
    
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


