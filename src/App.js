import React from 'react';
import './App.css';
import Header from './components/Header';
import CategoryContainer from './components/CategoryContainer';
// import { useSelector } from 'react-redux';

function App() {

  
  return (
    <div className="App">
      <Header />
      <CategoryContainer />
    </div>
  );
}

export default App;
