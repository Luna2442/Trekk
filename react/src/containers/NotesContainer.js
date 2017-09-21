import React, {Component} from 'react';
import NoteTile from '../components/NoteTile';

class NotesContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
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

  componentWillReceiveProps(){
    this.aggregateNotes();
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

    this.aggregateNotes();
  }

  handleItemChange(event){
    event.preventDefault();
    let stateName = event.target.name
    let value = event.target.value
    this.setState({[stateName]: value})
  }

  componentDidMount(){
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

  render() {

    let notes;
    notes = this.state.notes.map((note) => {
      return(
        <NoteTile
          key = {note.id}
          id = {note.id}
          header = {note.header}
          body = {note.body}
        />
      )
    })

    return(
      <div className="notes-container">
        {notes}
        <div>
          <form onSubmit={this.addNote}>
            <label htmlFor="header"></label>
            <input name="header" placeholder="Header" value={this.state.header} onChange={this.handleItemChange}/>
            <label htmlFor="body"></label>
            <input name="body" placeholder="Body" value={this.state.body} onChange={this.handleItemChange}/>
            <br/><br/>
            <input type="submit" value="Add Note" className="button" />
          </form>
        </div>
      </div>
    )
  }
}

export default NotesContainer;
