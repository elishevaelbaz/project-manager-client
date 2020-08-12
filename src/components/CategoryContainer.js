import React, { useEffect, useState } from 'react';
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards, setCurrentBoard } from '../store/board/actions'
import { fetchCategories, addCategoryAction } from '../store/category/actions';
import { addTaskAction, fetchTasks } from '../store/task/actions';
import { Grid, Container, Form, Popup, Button } from 'semantic-ui-react'
import TaskForm from './TaskForm';
import { withRouter } from 'react-router-dom';


const CategoryContainer = ({match}) => {

  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  console.log("MATCH", match)
  const currentBoard = useSelector(state => state.board.currentBoard)
  const boards = useSelector(state => state.board.boards)
  // const loading = useSelector(state => state.categories.loading)

  const categories = useSelector(state => state.category.categories)

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

    <div className="container">

    {/* <Grid columns={categories.length + 1}>
      <Grid.Row> */}
        {/* <div className="row"> */}
        {categories.map(category => <Category key={category.id} name={category.name} id={category.id}/>)}
      
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
    
  )
}

export default withRouter(CategoryContainer);