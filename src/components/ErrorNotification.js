import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HIDE_ERROR } from '../store/error/types';
import { Message, Icon } from 'semantic-ui-react'

const ErrorNotification = () => {
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

<Message negative compact floating >
<Icon name='close' onClick={handleClose} className="corner" color="red"/>
<Message.Header className="errorMessage">{error}</Message.Header>
{/* <p>{error}</p> */}
</Message>
 )}
 </>
 )
}

export default ErrorNotification;