import React, {Component} from 'react';

class UploadPhotoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: ''
    }
    this.handleItemChange = this.handleItemChange.bind(this)
    this.submitPhoto = this.submitPhoto.bind(this)
  }

  handleItemChange(event){
    event.preventDefault();
    let stateName = event.target.name
    let value = event.target.value
    this.setState({[stateName]: value})
  }

  submitPhoto(event){
    event.preventDefault();
    let photoPayload = {
      image: ''
    }
    fetch(`/api/v1/photos/${this.props.hikeId}`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(photoPayload)
    })

    this.props.aggregatePhotos();
    this.props.closeModal();
  }

  render() {
    return(
      <form onSubmit={this.submitPhoto}>
        <label htmlFor="photo"></label>
        <input name="photo" type="file" onChange={this.handleItemChange} />

        <input className="button" type="submit" value="Submit Photo"/>
      </form>
    )
  }
}

export default UploadPhotoForm;
