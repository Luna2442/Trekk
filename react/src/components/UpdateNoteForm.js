import React, {Component} from 'react';

class UpdateNoteForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      header: this.props.header,
      body: this.props.body
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

    this.props.aggregateNotes();
    this.props.closeModal();
  }

  render() {
    return(
      <form onSubmit={this.updateNote}>
        <h3>Edit Note</h3>
        <label htmlFor="header" style={{color:'white'}}>Header</label>
        <br/>
        <input type="text" name="header" value={this.state.header} onChange={this.handleItemChange}
          style={{
            color: 'black',
            margin: 'auto',
            width: '100%'
          }}
        />
        <br/>

        <label htmlFor="body" style={{color:'white'}}>Body</label>
        <br/>
        <textArea type="text" name="body" value={this.state.body} onChange={this.handleItemChange}
          style={{
            color: 'black',
            margin: 'auto',
            width: '100%',
            height: '22vh'}}
        />
        <br/><br/>

        <input type="submit" value="Update" className="button" />
        <input type="submit" value="Cancel" className="button delete-button" onClick={this.props.closeModal} style={{float:'right'}}/>
      </form>
    )
  }
}

export default UpdateNoteForm;
