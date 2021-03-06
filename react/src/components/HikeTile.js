import React, {Component} from 'react';
import { connect } from 'react-redux';

import UploadPhotoForm from './UploadPhotoForm';
import Gallery from 'react-grid-gallery';
import {Grid, Row, Col, Well, Modal} from 'react-bootstrap';

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
      })}.bind(this), 1000)
  }

  componentDidMount(){
    setTimeout(function(){
      fetch(`/api/v1/photos/${this.props.id}`, {
        credentials: 'same-origin'
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        if(body[0] != undefined){
          this.setState({
            photos: body
          })
        }
      })}.bind(this), 100)
  }

  render() {
    let geography;
    let deleteButton;
    let uploadButton;
    let photos = [];
    if(this.props.id === this.props.selectedHike){
      geography =
      <div>
        <h5>Geography:</h5>
          <li>Latitude: {this.props.latitude}</li>
          <li>Longitude: {this.props.longitude}</li>
      </div>
      deleteButton = <input type='button' className="button delete-button" defaultValue='Remove this hike' onClick={this.deleteHike} />
      uploadButton = <input type='button' className="button" defaultValue='Add a photo' onClick={this.openModal} />

      photos = this.state.photos.map((photo) => {
        return (
        {
          src: `${photo.image}`,
          thumbnail: `${photo.image}`,
          thumbnailWidth: 82,
          thumbnailHeight: 80
        })

      })

    }

    return(
      <Col sm={12} lg={12}>
        <div className="hike" >
          <h4 onClick={this.props.handleClick}>{this.props.name}</h4>
          <p>{this.props.rating}</p>
          <p>{this.props.address}</p>
          {geography}
          <br/>
          {deleteButton}
          {uploadButton}
          <div className="photos">
            <Gallery images={photos} backdropClosesModal={true} rowHeight={100}/>
          </div>
        </div>
        <Modal show={this.state.photoFormActive}>
          <Modal.Body>
            <UploadPhotoForm hikeId={this.props.id} closeModal={this.closeModal} aggregatePhotos={this.aggregatePhotos}/>
          </Modal.Body>
        </Modal>

      </Col>
    )
  }
}

let mapStateToProps = (store) => {
  return {
    hikesLoading: store.hikesLoading,
    selectedHike: store.hikes.selectedHike,
    hikes: store.hikes.myHikes
  }
}

export default connect(mapStateToProps)(HikeTile);
