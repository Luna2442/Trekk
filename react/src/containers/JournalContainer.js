import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getHikes } from '../../redux/actions/hike-actions';

import HikeTile from '../components/HikeTile';
import NotesContainer from './NotesContainer';

import {Grid, Row, Col, Well} from 'react-bootstrap';
import { setTimeout } from 'timers';

class JournalContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null
    }
    this.aggregateHikes = this.aggregateHikes.bind(this)
    this.handleOpenHike = this.handleOpenHike.bind(this)
  }

  aggregateHikes(){
    setTimeout(function(){
      this.props.dispatch(
        getHikes(
          fetch(`/api/v1/users/:id`, {credentials: 'same-origin'})
          .then(response => response.ok ? response.json() : new UserException('Bad Fetch'))
        )
      )
    }.bind(this), 100)
  }

  handleOpenHike(id){
    this.setState({id: id})
  }

  componentDidMount(){

    this.props.dispatch(
      getHikes(
        fetch(`/api/v1/users/:id`, {credentials: 'same-origin'})
        .then(response => response.ok ? response.json() : new UserException('Bad Fetch'))
      )
    )
  }

  render() {
    let hikes;
    hikes = this.props.hikes.map((hike) => {

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

let mapStateToProps = (store) => {
  return {
    hikesLoading: store.trailsLoading,
    hikes: store.hikes.myHikes
  }
}

export default connect(mapStateToProps)(JournalContainer);
