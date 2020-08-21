import React, { useEffect } from 'react'
import { Card, Icon, Label, Image } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction } from '../store/task/actions'
import { fetchComments } from '../store/comment/actions'
import { fetchAttachments,  } from '../store/attachment/actions'
import { Draggable } from 'react-beautiful-dnd'
import { openModal } from '../store/modal/actions'
import TaskModal from './TaskModal'
import { fetchTaskLabels } from '../store/task/actions'

const Task = ({task, count, index,}) => {
  console.log("TASK", task)
  
  const currentUser = useSelector(state => state.user.currentUser.username)
  const comments = useSelector(state => state.comment.comments)

  const members = useSelector(state => state.board.members)
  const assignedMember = members.find(member => member.username === task.assigned_to)
  const currentTask = useSelector(state => state.task.tasks.find(t => t.id === task.id))
  // console.log(currentTask, "currentTask")
  const taskLabels = currentTask.taskLabels
  // console.log("taskLabels", taskLabels)
  // const filteredTaskLabels = taskLabels.filter(l => l.task_id === task.id)

  const labels = useSelector(state => state.label.labels)
  // console.log("labels", labels)
  const filteredLabels = taskLabels.map(tl => {
    return labels.find(label => label.id === tl.label_id)
  })

  console.log("filteredLabels", filteredLabels)

  const modalIsOpen = useSelector(state => state.modal.isOpen)

  const dispatch = useDispatch()


  // if separate out the modal, move this useeffect there
  // so don't have to fetch all the comments at once
    useEffect(() => {
    // dispatch(fetchCurrentTask(match.params.id))
// comments associated with this task
    // dispatch(fetchTaskLabels(task.id))
  }, [dispatch, task])

  // let history = useHistory()

  const handleDelete = (id) => {
    dispatch(deleteTaskAction(id))
  }

  

 //==========================
//  let positionOptions = []

//  for (let i = 1; i <= count; i++) {
//    const option = {
//     key: i, text: i, value: i
//   };
//    positionOptions.push(option)
//  }
  
  return(
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, ) => (

      
      <div {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
        <Card
        className="task-card"
          // href='#card-example-link-card'
          key={task.id}
          onClick={(e) => {
            if (e.target.className.includes("trash icon")){
              return
            }
            // dispatch({type: "OPEN_MODAL"})
            dispatch(fetchComments(task.id))
            dispatch(fetchTaskLabels(task.id))
            dispatch(fetchAttachments(task.id))
            dispatch(openModal(task))

            // setOpen(true)
          }}
          
        >
          <Card.Content>
            <Card.Description>
            {task.name}
            </Card.Description>
            {/* <Card.Meta>{task.position}</Card.Meta>
            <Card.Meta>{index}</Card.Meta> */}
            {/* <Dropdown
          placeholder='Change position'
          fluid
          selection
          options={positionOptions}
          // defaultValue={currentCategoryId || null}
          onChange={(e, {value}) => handleSelect(value)}
          /> */}
          <Card.Content extra>
            <br />
          {filteredLabels.length ? filteredLabels.map((label) => (
      <Label color={(label && label.color )|| "blue"} key={label && label.id}>
       {label && label.name}
      </Label>)) : null}

      {(task.assigned_to && assignedMember) &&
      <Image src={`https://react.semantic-ui.com/images/avatar/small/${assignedMember.avatar}.jpg`} alt="avatar" avatar className="top-left-corner" />
      } 
      {/* && <Icon name="trash" className="bottom-corner" onClick={() => handleDelete(task.id)} /> : null} */}


      {task.created_by === currentUser ? <Icon name="trash" className="bottom-corner" onClick={() => handleDelete(task.id)} /> : null}

      
    </Card.Content>
            {/* <Card.Meta><Icon comment outline/></Card.Meta> */}
      
    </Card.Content>
      </Card>

      {modalIsOpen && <TaskModal key={task.id}/>}
      
      </div>
    )}
    </Draggable>
    // </>
    )
}

export default Task;