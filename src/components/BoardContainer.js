import React, { useEffect, useState } from 'react';
import CategoryContainer from './CategoryContainer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoards, addBoardAction, setCurrentBoard } from '../store/board/actions'
import { fetchCategories } from '../store/category/actions';
import BoardCard from './BoardCard';
import { Card, Icon, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


const BoardContainer = ({history}) => {

  const [nameInput, setNameInput] = useState("")
  const [formShown, setFormShown] = useState(false)

  // const currentBoard = useSelector(state => state.board.currentBoard)
  // const loading = useSelector(state => state.categories.loading)
const boards = useSelector(state => state.board.boards)
  // const categories = useSelector(state => state.category.categories)
  // const tasks = useSelector(state => state.task.tasks)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  // useEffect(() => {
  //   // if (currentBoard.id) {
  //   //   dispatch(fetchCategories(currentBoard.id))
  //   //   dispatch(fetchTasks(currentBoard.id))

  //   // }
  //   const id = boards[boards.length -1].id
  //   dispatch(setCurrentBoard(id))

  //   history.push(`/boards/${id}`)

  // }, [boards])
  const handleNewBoard = () => {
    setFormShown(true)
  }

  const handleChange = (e) => {
    setNameInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const boardObj = {
      name: nameInput
    }
    dispatch(addBoardAction(boardObj))
  }

  return(
    <div>
      {boards[0] && boards.map(board => <BoardCard key={board.id} board={board} />)}
      
      <Card
      // key={board.id}
      onClick={handleNewBoard}>
      <Card.Content>

      <Card.Header><Icon name="plus" />Add a Board</Card.Header>

    </Card.Content>
    {formShown && <Form onSubmit={handleSubmit}>
    <Form.Input fluid name="name" placeholder='Board name' onChange={handleChange} />

    </Form>}
      </Card>      
    </div>
    
    
  )
}

export default withRouter(BoardContainer);