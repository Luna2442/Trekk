import React, {Component} from 'react';

class UpdateNoteForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      header: '',
      body: ''
    }
    this.handleItemChange = this.handleItemChange.bind(this)
    this.updateNote = this.updateNote.bind(this)
  }

  handleItemChange(event){
    event.preventDefault();
    let stateName = event.target.name
    let value = event.target.value
    this.setState({[stateName]: value})
  }

  updateNote(event){
    event.preventDefault();
    let notePayload = {
      header: this.state.header,
      body: this.state.body,
    }
    fetch(`/api/v1/notes/${this.props.id}`, {
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(notePayload)
    })

    this.props.aggregateNotes()
  }

  render() {
    return(
      <form onSubmit={this.updateNote}>
        <label htmlFor="header"></label>
        <input type="text" name="header" value={this.state.header} onChange={this.handleItemChange} />

        <label htmlFor="body"></label>
        <input type="text" name="body" value={this.state.body} onChange={this.handleItemChange} />
        <br/>

        <input type="submit" value="Update" className="button" />
      </form>
    )
  }
}

export default UpdateNoteForm;
