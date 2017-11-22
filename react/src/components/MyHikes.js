import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getHikes, selectHike } from '../../redux/actions/hike-actions';

import HikeTile from './HikeTile';

import { setTimeout } from 'timers';

class MyHikes extends Component {
  constructor(props){
    super(props);
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
    this.props.dispatch(selectHike(id))
  }

  render() {
    let hikes;
    hikes = this.props.hikes.map((hike) => {

      let handleClick = () => {
        if (this.props.selectedHike !== hike.id) {
          this.handleOpenHike(hike.id)
        } else {
          this.handleOpenHike(null)
        }
      }

      let address, latitude, longitude, rating, types;
      if (this.props.selectedHike === hike.id) {
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
        <div>
            <h3>My Hikes</h3>
            {hikes}
        </div>
    )
  }
}

export default connect()(MyHikes);