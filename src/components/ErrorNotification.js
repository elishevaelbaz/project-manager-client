import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HIDE_ERROR } from '../store/error/types';

const ErrorNotification = (props) => {
 const isOpen = useSelector(state => state.error.isOpen);
 const error = useSelector(state => state.error.error);

 const dispatch = useDispatch();

 const handleClose = () => {
  dispatch({
    type: HIDE_ERROR
  })
 }
 
 return (
 <>
 {isOpen && error && (
 <div className="fancy-error-class">
   <span>{error}</span>
 <button onClick={handleClose}>Close Error</button>
 
 </div>
 )}
 </>
 )
}

export default ErrorNotification;