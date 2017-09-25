import React, {Component} from 'react';
import Modal from 'react-modal';
import UpdateNoteForm from './UpdateNoteForm';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 100,
    left              : 400,
    right             : 400,
    bottom            : 100,
    backgroundColor   : 'black',
    opacity           : 0.9
  },
  content : {
    color                      : 'white',
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    border                     : '1px solid #ccc',
    background                 : 'black',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'
  }
};

class NoteTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      editFormActive: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  openModal() {
    this.setState({editFormActive: true});
  }

  closeModal() {
    this.setState({editFormActive: false});
  }

  deleteNote(){
    fetch(`/api/v1/notes/${this.props.id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    this.props.aggregateNotes()
  }

  render() {

    let formattedTime = new Date(this.props.time).toString()

    return(
      <div>
        <div className="note-tile">
          <h4>{this.props.header}</h4>
          <h5>{formattedTime}</h5>
          <p>{this.props.body}</p>
          <input type='button' className="button update-button" defaultValue='Edit this note' onClick={this.openModal}/>
          <input type='button' className="button delete-button" defaultValue='Remove this note' onClick={this.deleteNote} />
        </div>
        <Modal
          isOpen={this.state.editFormActive}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Note"
        >
          <UpdateNoteForm id={this.props.id} header={this.props.header} body={this.props.body} aggregateNotes={this.props.aggregateNotes} closeModal={this.closeModal}/>
        </Modal>
      </div>
    )
  }
}

export default NoteTile;
