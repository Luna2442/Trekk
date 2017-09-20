import React, {Component} from 'react';

class TrailSearchTile extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.addToHikes = this.addToHikes.bind(this)
  }

  addToHikes(event){
    event.preventDefault();
    let hikePayload = {
      id: this.props.id,
      name: this.props.name,
      location: this.props.address,
      geometry: this.props.geometry,
      rating: this.props.rating,
      types: this.props.types
    }

    fetch(`/api/v1/hikes`, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(hikePayload)
    })
  }

  render() {
    return(
      <div>

        <div className="trail-list" onClick={this.props.handleClick}>
          <h4>{this.props.name}</h4>
          <p>{this.props.address}</p>
          <p>Rating: {this.props.rating}</p>
        </div>

        <div className="addTrailButton button">
          <button onClick={this.addToHikes}>Add to hikes</button>
        </div>

        <hr/>
      </div>
    )
  }
}

export default TrailSearchTile;
