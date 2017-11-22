import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getHikes, selectHike } from '../../redux/actions/hike-actions';

import HikeNotes from '../components/HikeNotes';
import MyHikes from '../components/MyHikes';

import {Grid, Row, Col, Well} from 'react-bootstrap';

class JournalContainer extends Component {
  constructor(props){
    super(props);
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
    return(
      <Grid>
        <Row>
          <Col sm={12} lg={4} className="hikes-list">
            <MyHikes hikes={this.props.hikes} selectedHike={this.props.selectedHike} />
          </Col>
          <Col sm={12} lg={7} className="notes-list">
            <HikeNotes selectedHike={this.props.selectedHike} changeSelectedHike={this.handleOpenHike} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

let mapStateToProps = (store) => {
  return {
    hikesLoading: store.hikesLoading,
    selectedHike: store.hikes.selectedHike,
    hikes: store.hikes.myHikes
  }
}

export default connect(mapStateToProps)(JournalContainer);
