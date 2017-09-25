import React, {Component} from 'react';
import Modal from 'react-modal';
import UploadPhotoForm from './UploadPhotoForm';

let customStyles = {
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

class HikeTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      photoFormActive: false,
      photos: []
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteHike = this.deleteHike.bind(this)
    this.aggregatePhotos = this.aggregatePhotos.bind(this)
  }

  openModal() {
    this.setState({photoFormActive: true});
  }

  closeModal() {
    this.setState({photoFormActive: false});
  }

  deleteHike(){
    let path = location.pathname
    fetch(`/api/v1/${path}/hikes/${this.props.id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    this.props.aggregateHikes()
  }

  aggregatePhotos(){
    setTimeout(function(){
      fetch(`/api/v1/photos/${this.props.id}`, {
        credentials: 'same-origin'
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({
          photos: body
        })
      })}.bind(this), 100)
  }

  render() {

    let geography;
    let deleteButton;
    let uploadButton;
    let photos;
    if(this.props.latitude && this.props.longitude){
      geography =
      <div>
        <h5>Geography:</h5>
        <ul>
          <li>Latitude: {this.props.latitude}</li>
          <li>Longitude: {this.props.longitude}</li>
        </ul>
      </div>
      deleteButton = <input type='button' className="button delete-button" defaultValue='Remove this hike' onClick={this.deleteHike} />
      uploadButton = <input type='button' className="button" defaultValue='Add a photo' onClick={this.openModal} />
      photos = this.state.photos.map((photo) => {
        <img src={photo.image} />
      })
    }

    return(
      <div>
        <div className="hike" onClick={this.props.handleClick}>
          <h4>{this.props.name}</h4>
          <p>{this.props.rating}</p>
          <p>{this.props.address}</p>
          {geography}
        </div>
        {deleteButton}
        {uploadButton}
        <hr/>
        {photos}
        <Modal
          isOpen={this.state.photoFormActive}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Note"
        >
          <UploadPhotoForm hikeId={this.props.id} closeModal={this.closeModal} aggregatePhotos={this.aggregatePhotos}/>
        </Modal>
      </div>
    )
  }
}

export default HikeTile;
