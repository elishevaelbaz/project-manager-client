import React from 'react'
import { Card, Icon} from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction } from '../store/task/actions'
import { fetchComments } from '../store/comment/actions'
import { fetchAttachments,  } from '../store/attachment/actions'
import { Draggable } from 'react-beautiful-dnd'
import { openModal } from '../store/modal/actions'
import TaskModal from './TaskModal'

const Task = ({task, count, index,}) => {
  console.log("TASK", task)
  

  const currentUser = useSelector(state => state.user.currentUser.username)
  const comments = useSelector(state => state.comment.comments)


  const modalIsOpen = useSelector(state => state.modal.isOpen)

  const dispatch = useDispatch()


  // if separate out the modal, move this useeffect there
  // so don't have to fetch all the comments at once
//     useEffect(() => {
//     // dispatch(fetchCurrentTask(match.params.id))
// // comments associated with this task
//     // dispatch(fetchComments(task.id))
//   }, [dispatch, task])

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
          // href='#card-example-link-card'
          key={task.id}
          onClick={() => {
            // dispatch({type: "OPEN_MODAL"})
            dispatch(fetchComments(task.id))
            dispatch(fetchAttachments(task.id))
            dispatch(openModal(task))

            // setOpen(true)
          }}
          
        >
          <Card.Content>
          {task.created_by === currentUser ? <Icon name="trash" onClick={() => handleDelete(task.id)} /> : null}

          {/* <Card.Href>#card-example-link-card</Card.Header> */}
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
      {comments.filter(c => c.task_id === task.id) ? 
        <Icon name='comment outline' /> : null}
   
    </Card.Content>
            {/* <Card.Meta><Icon comment outline/></Card.Meta> */}
      
    </Card.Content>
      </Card>

      {modalIsOpen && <TaskModal />}
      
      </div>
    )}
    </Draggable>
    // </>
    )
}

export default Task;