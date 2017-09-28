import React, {Component} from 'react';
import TrailSearchTile from '../components/TrailSearchTile';
import {Grid, Row, Col, Well} from 'react-bootstrap';

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

    let map = <iframe
                frameBorder="0"
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
      <Grid>
        <Row>
          <Col sm={12} lg={6}>
            <form onSubmit={this.searchTrails} className="trail-search-form">
              <label htmlFor="search"></label>
              <input className="text" name="search" placeholder="Search" value={this.state.search} onChange={this.handleItemChange}/>
              <br/><br/>
              <input type="submit" value="List Results" className="button" />
            </form>
            <div className="map">
              {map}
            </div>
          </Col>

          <Col sm={12} lg={6} className="trail-search-list">
            {trailComponents}
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default TrailSearchContainer;
