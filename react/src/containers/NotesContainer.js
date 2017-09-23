import React, {Component} from 'react';
import NoteTile from '../components/NoteTile';

class NotesContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      notes: [],
      header: '',
      body: ''
    }
    this.aggregateNotes = this.aggregateNotes.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  aggregateNotes(){
    setTimeout(function(){
      fetch(`/api/v1/notes/${this.props.selectedHike}`, {
        credentials: 'same-origin'
      })
      .then(response => {
          return response.json();
      })
      .then(body => {
        this.setState({
          notes: body
        })
      })}.bind(this), 100)
  }

  handleItemChange(event){
    event.preventDefault();
    let stateName = event.target.name
    let value = event.target.value
    this.setState({[stateName]: value})
  }

  addNote(event){
    event.preventDefault();
    let notePayload = {
      hike_id: this.props.selectedHike,
      header: this.state.header,
      body: this.state.body,
    }
    fetch(`/api/v1/notes/`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(notePayload)
    })
    this.setState({
      header: '',
      body: ''
    })
    this.aggregateNotes();
  }

  componentDidMount(){
    if(this.props.selectedHike != null){
      fetch(`/api/v1/notes/${this.props.selectedHike}`, {
        credentials: 'same-origin'
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMessage = `${response.status} ${response.statusText}`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(body => {
        this.setState({
          notes: body
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  componentWillReceiveProps(){
    if(this.props.selectedHike != null && this.state.notes != []){
      setTimeout(() => {
        this.setState({
          notes: []
        })
      }, 100)
    } else {
      this.aggregateNotes();
    }
  }

  render() {

    let notes;
    notes = this.state.notes.map((note) => {
      return(
        <NoteTile
          key = {note.id}
          id = {note.id}
          header = {note.header}
          time = {note.created_at}
          body = {note.body}
          aggregateNotes={this.aggregateNotes}
        />
      )
    })

    return(
      <div className="notes-container">
        <div className="note-form">
          <form onSubmit={this.addNote}>
            <h5>New Entry</h5>
            <label htmlFor="header"></label>
            <input name="header" placeholder="Header" value={this.state.header} onChange={this.handleItemChange}/>
            <label htmlFor="body"></label>
            <textarea name="body" placeholder="Body" value={this.state.body} onChange={this.handleItemChange}/>
            <br/>
            <input type="submit" value="Add Note" className="button" />
            <hr/>
          </form>
        </div>
        <div className="note-scroller">
          {notes}
        </div>
      </div>
    )
  }
}

export default NotesContainer;
