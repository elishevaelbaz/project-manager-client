import React, { useState } from 'react'
// import { addAttachmentAction } from '../store/attachment/actions'
import { useDispatch } from 'react-redux'

const AttachmentForm = ({ taskId }) => {

  const [attachment, setAttachment] = useState(
    {
      image: {},
      video: {},
      task_id: taskId
    })

  const dispatch = useDispatch()

  const onChange = (e) => {
    e.persist()
    setAttachment({
      ...attachment,
      [e.target.name]: e.target.files[0]
    })
    console.log(attachment)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("image", attachment.image)
    form.append("video", attachment.video)
    console.log(form)
    form.append("task_id", taskId)

    // const attachData = {
    //   ...attachment, 
    //   // task_id: taskId
    // }
    // console.log(JSON.stringify(attachment))
    // dispatch(addAttachmentAction(form))

    // for some reason separating this out to action didn't work
    fetch(`http://localhost:3000/attachments`, {
        method: "POST",
        credentials: "include",
        body: form
    })
    .then(r => r.json())
    .then(attachment => {
      dispatch({
        type: "ADD_ATTACHMENT",
        payload: attachment
      })
    })
  }

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <label>Upload an Image: </label>
        <input type="file" name="image" onChange={onChange}/>
        <br/>
        <input type="submit"/>
      </form>
    </div>
  )
}


export default AttachmentForm