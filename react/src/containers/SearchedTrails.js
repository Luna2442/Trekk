import React, {Component} from 'react';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTrails } from '../../redux/actions';
import ReactLoading from 'react-loading';
import TrailSearchTile from '../components/TrailSearchTile';


export class SearchedTrails extends Component {




    render() {
        let trailComponents = this.props.trails.map((trail) => {
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

          return (
              <div>
                {trailComponents}
              </div>
          )

    }
}


let mapStateToProps = (store) => {
    return {
      trailsLoading: store.trailsLoading
    }
  }

export default connect(mapStateToProps)(SearchedTrails)