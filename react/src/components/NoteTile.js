import React from 'react';
import UpdateNoteForm from './UpdateNoteForm';

const NoteTile = props => {

  let deleteNote = () => {
    fetch(`/api/v1/notes/${props.id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    props.aggregateNotes()
  }

  let formattedTime = new Date(props.time).toString()

  return(

    <div className="note-tile">
      <h4>{props.header}</h4>
      <h5>{formattedTime}</h5>
      <p>{props.body}</p>

      <UpdateNoteForm id={props.id} aggregateNotes={props.aggregateNotes}/>

      <input type='button update-button' className="button" defaultValue='Update this note' />
      <input type='button delete-button' className="button" defaultValue='Delete this note' onClick={deleteNote} />
    </div>
  )
}


export default NoteTile;
