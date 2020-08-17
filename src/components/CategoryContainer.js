import React, { useEffect, useState } from 'react';
import Category from './Category'
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux'
import { fetchBoards, setCurrentBoard } from '../store/board/actions'
import { fetchCategories, addCategoryAction } from '../store/category/actions';
import { addTaskAction, fetchTasks, updateTaskAction, updatePositionAction } from '../store/task/actions';
import { Grid, Container, Form, Popup, Button } from 'semantic-ui-react'
// import TaskForm from './TaskForm';
import { withRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd'
// import { REORDER_CATEGORY_TASKS, REORDER_CATEGORIES_TASKS } from '../store/category/types';
// import { REORDER_TASKS } from '../store/task/types';


const CategoryContainer = ({match}) => {

  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  console.log("MATCH", match)
  const currentBoard = useSelector(state => state.board.currentBoard)
  const boards = useSelector(state => state.board.boards)
  // const loading = useSelector(state => state.categories.loading)

  const categories = useSelector(state => state.category.categories)
  const tasks = useSelector(state => state.task.tasks)

  const dispatch = useDispatch()
  // on component mount
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  // once the boards are fetched, set currentBoard
  useEffect(() => {
    if (boards) {
      dispatch(setCurrentBoard(parseInt(match.params.id)))
    }
  }, [boards, dispatch, match.params.id]) //really just boards, but added the others because of react warning

  // once curretnBoard is set
  useEffect(() => {
    if (currentBoard) {
      dispatch(fetchCategories(currentBoard.id))
      dispatch(fetchTasks(currentBoard.id))
    }
    // else {
    //   console.log("here")
    //   dispatch(setCurrentBoard(parseInt(match.params.id)))
    // }

  }, [currentBoard, dispatch])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (name.trim())
    {
      const categoryObj = {
      name,
      board_id: currentBoard.id

    }

    
    dispatch(addCategoryAction(categoryObj))
  }
    setIsOpen(false)
  }

  const onDragEnd = result => {
    console.log("RESULT", result)
    const { destination, source, draggableId } = result

    if (!destination){
      return
    }
    // dropped at same place where it started
    if (destination.droppableId === source.droppableId && destination.index === source.index){
      return
    }
    // if position is changed
    const start = categories.find(category => category.id === parseInt(source.droppableId, 10))
    const finish = categories.find(category => category.id === parseInt(destination.droppableId, 10))
    console.log("Start:", start,"Finish:", finish, "categories:", categories, "droppableId:", source.droppableId)
    // if start and end in same category
    if (start === finish){
      console.log("start = finish", start, finish)

      const newTasks = tasks.filter(task => task.category_id === parseInt(start.id))
      console.log("source.index:", source.index, "destination.index:", destination.index, "newTasks:", newTasks)

      newTasks.splice(source.index, 1)
      console.log("newTasks", newTasks)

      // task with draggableId
      const tk = tasks.find(t => t.id === parseInt(draggableId))
      newTasks.splice(destination.index, 0, tk) //removedTaskArr[0]
      console.log("newTasks", newTasks)
      const newColumn = {
        ...start,
        tasks: newTasks
      }
      console.log("newColumn", newColumn)
      
      const body = {
        ...tk, 
        position: destination.index + 1,
        category_id: tk.category_id,
        prev_category_id: start.id,
        prev_position: source.index + 1
      }
      console.log("BODY", body)
      dispatch(updatePositionAction(tk.id, body))
      return
    }

    // if start and end in diferent categories
    const startTasks = tasks.filter(task => task.category_id === parseInt(start.id))

    startTasks.splice(source.index, 1) //const removedTaskArr = 

    const newStart = {
      ...start,
      tasks: startTasks
    }

    console.log("newStart", newStart)

    const finishTasks = tasks.filter(task => task.category_id === parseInt(finish.id))

    const t = tasks.find(t => t.id === parseInt(draggableId))
    console.log(t)

    finishTasks.splice(destination.index , 0, t) //removedTaskArr[0]

    // task with draggableId
    console.log("startTasks", startTasks)
    console.log("finishTasks", finishTasks)
    const newFinish = {
      ...finish,
      tasks: finishTasks
    }
    console.log("newFinish", newFinish)

    // update category in database as well 
    console.log("destination.index", destination.index)
    

    const body = {
      ...t,
      category_id: newFinish.id,
      position: destination.index + 1,
      prev_category_id: start.id,
      prev_position: source.index + 1
    }
    console.log("BODY", JSON.stringify(body))
    dispatch(updatePositionAction(t.id, body))
  }

  return(
    // <Container>

    // <Grid columns={categories.length + 1}>
    //   <Grid.Row>
    //     {categories.map(category => <Category key={category.id} name={category.name} id={category.id}/>)}
      
      
    //     <Grid.Column>
    // <Popup
    //     trigger={<Button icon='add' content='Add a category' />}
    //     content={<Form onSubmit={handleAddCategory}>

    //     <Form.Input  name="name" label="Add a category" placeholder='Category name' onChange={handleChange} />
    
    //     </Form>}
    //     on='click'
    //     // open={isOpen}
    //     // onOpen={handleOpen}
    //   />
    //   </Grid.Column>
      
    // </Grid.Row>
    // </Grid>

    // {categories.length === 0 && <h1>Add categories to begin</h1>}
    
    // </Container>
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="container">

    {/* <Grid columns={categories.length + 1}>
      <Grid.Row> */}
        {/* <div className="row"> */}
        {categories.map(category => <Category key={category.id} name={category.name} id={category.id} taskOrder={category.tasks}/>)}
      
        {/* <Grid.Column> */}
        <div>
    <Popup
        trigger={<Button icon='add' content='Add a category' />}
        content={<Form onSubmit={handleAddCategory}>

        <Form.Input  name="name" label="Add a category" placeholder='Category name' onChange={handleChange} />
    
        </Form>}
        on='click'
        // open={isOpen}
        // onOpen={handleOpen}
      />
      {/* </div> */}
      </div>

      {/* </Grid.Column> */}
      
    {/* </Grid.Row> */}
    {/* </Grid> */}

    {categories.length === 0 && <h1>Add categories to begin</h1>}
    
    </div>
    </DragDropContext>

  )
}

export default withRouter(CategoryContainer);