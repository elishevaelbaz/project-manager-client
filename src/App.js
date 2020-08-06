import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CategoryContainer from './components/CategoryContainer';
import {  useDispatch } from 'react-redux';
import { fetchBoards } from './store/board/actions';

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchBoards())
    // getTasks()
    //   .then(tasks => dispatch({ type: SET_TASKS, payload: tasks}))
  }, [dispatch])

  return (
    <div className="App">
      <Header/>
      <CategoryContainer />
    </div>
  );
}

export default App;
