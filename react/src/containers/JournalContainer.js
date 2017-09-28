import React, {Component} from 'react';
import HikeTile from '../components/HikeTile';
import NotesContainer from './NotesContainer';
import {Grid, Row, Col, Well} from 'react-bootstrap';

class JournalContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      hikes: [],
      id: null
    }
    this.aggregateHikes = this.aggregateHikes.bind(this)
    this.handleOpenHike = this.handleOpenHike.bind(this)
  }

  aggregateHikes(){
    setTimeout(function(){
      let path = location.pathname
      fetch(`/api/v1/${path}/`, {
        credentials: 'same-origin'
      })
      .then(response => {
        return response.json();
      })
      .then(body => {
        this.setState({
          hikes: body
        })
      })}.bind(this), 100)
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
          aggregateHikes={this.aggregateHikes}
        />
      )
    })

    return(
      <Grid>
        <Row>
          <Col sm={12} lg={4} className="hikes-list">
            <h3>My Hikes</h3>
            {hikes}
          </Col>
          <Col sm={12} lg={7} className="notes-list">
            <NotesContainer selectedHike={this.state.id} changeSelectedHike={this.handleOpenHike} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default JournalContainer;
