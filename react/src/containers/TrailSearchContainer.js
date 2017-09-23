import React, {Component} from 'react';
import TrailSearchTile from '../components/TrailSearchTile';

class TrailSearchContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      trails: []
    }
    this.searchTrails = this.searchTrails.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
  }

  searchTrails(event){
    event.preventDefault();
    let init = {
      credentials: 'same-origin'
    };

    fetch(`/api/v1/trails/${this.state.search}`, {
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
        trails: body.results
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleItemChange(event){
    event.preventDefault();
    let stateName = event.target.name
    let value = event.target.value
    this.setState({[stateName]: value})
  }

  render() {

    let mapStyle = {
      border:0
    }

    let map = <iframe
                width="550" height="473" frameBorder="0" style={mapStyle}
                src={`https://www.google.com/maps/embed/v1/search?q=${this.state.search}%20hiking%20trails&key=AIzaSyB5KSiNWNW318XVycsRXfNYFjZNyz4IOa0`}
                allowFullScreen>
              </iframe>

    let trailComponents = this.state.trails.map((trail) => {
      return(
        <TrailSearchTile
          key = {trail.id}
          id = {trail.id}
          name = {trail.name}
          address = {trail.formatted_address}
          geometry = {trail.geometry}
          rating = {trail.rating}
          types = {trail.types}
        />
      )
    })

    return(
      <div>
        <div className="small-12 medium-12 large-5 column">
          <form onSubmit={this.searchTrails}>
            <label htmlFor="search"></label>
            <input name="search" placeholder="Search" value={this.state.search} onChange={this.handleItemChange}/>
            <br/><br/>
            <input type="submit" value="List Results" className="button" />
          </form>

          <div className="map">
            {map}
          </div>
        </div>

        <div className="small-12 medium-12 large-7 column trail-search-list">
          {trailComponents}
        </div>
      </div>
    )
  }
}

export default TrailSearchContainer;
