import React, {Component} from 'react';
import HikeTile from '../components/HikeTile';

class JournalContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      hikes: [],
      id: null
    }
    this.handleOpenHike = this.handleOpenHike.bind(this)
  }

  handleOpenHike(id){
    this.setState({id: id})
  }

  componentDidMount(){
    fetch('/api/v1/users/:id', {
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
        hikes: body
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let hikes;
    hikes = this.state.hikes.map((hike) => {

      let handleClick = () => {
        if (this.state.id !== hike.id) {
          this.handleOpenHike(hike.id)
        } else {
          this.setState({id: null})
        }
      }

      let address, latitude, longitude, rating, types;
      if (this.state.id === hike.id) {
        address = hike.location
        latitude = hike.longitude
        longitude = hike.latitude
        rating = hike.rating
        types = hike.types

      } else {
        address = null;
        latitude = null;
        longitude = null;
        rating = null;
        types = null;
      }

      return(
        <HikeTile
          key = {hike.id}
          id = {hike.id}
          name = {hike.trail_name}
          rating = {rating}
          address = {address}
          latitude = {latitude}
          longitude = {longitude}
          types = {types}
          handleClick={handleClick}
        />
      )
    })

    return(
      <div className="small-12 medium-12 large-5 column journal-hikes-list">
      <h3>My Hikes</h3>
        {hikes}
      </div>
    )
  }
}

export default JournalContainer;
