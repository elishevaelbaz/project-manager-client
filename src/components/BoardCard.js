import React from 'react'
import { withRouter } from "react-router";
import { Card } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { setCurrentBoard } from '../store/board/actions';

const BoardCard = ({board, history, match}) => {
  console.log("board", board)
  

  
  const dispatch = useDispatch()

  const handleBoardClick = () => {
    if (match.params.id=== "new"){

    }
    else{
      console.log("click")
      dispatch(setCurrentBoard(board.id))
      history.push(`/boards/${board.id}`)

    }

  }

  

  return(

    <Card
      key={board.id}
      onClick={handleBoardClick}
    >
      <Card.Content>

      <Card.Header>{board.name}</Card.Header>

    </Card.Content>
      </Card>
    )  
}

export default withRouter(BoardCard);