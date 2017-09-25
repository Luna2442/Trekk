import React, {Component} from 'react';

class UploadPhotoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: ''
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.submitPhoto = this.submitPhoto.bind(this)
  }

  handleFileChange(event){
    let file = event.target.files[0]
    this.setState({image: file})
  }

  submitPhoto(event){
    event.preventDefault();
    let preview = document.querySelector('img');
    let file    = this.state.image
    let reader  = new FileReader();
    let hikeId = this.props.hikeId

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.addEventListener("load", function () {
      fetch(`/api/v1/photos/${hikeId}`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({photo: reader.result})
      })
    }, false);

    this.props.aggregatePhotos();
    this.props.closeModal();
  }

  render() {
    return(
      <form onSubmit={this.submitPhoto}>
        <img src="" height="200"/>
        <input type="file" name="file" ref="file" defaultValue={this.state.file} onChange={this.handleFileChange} /><br />
        <input type="submit" />
      </form>
    )
  }
}

export default UploadPhotoForm;
