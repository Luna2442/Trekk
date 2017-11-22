import React, {Component} from 'react';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import { connect } from 'react-redux';
import { clearTrails, getTrails } from '../../redux/actions';
import SearchedTrails from './SearchedTrails';

export class TrailSearchContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
    this.searchTrails = this.searchTrails.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
  }

  searchTrails(event){
    event.preventDefault();

    this.props.dispatch(clearTrails())

    this.props.dispatch(
      getTrails(
        fetch(`/api/v1/trails/${this.state.search}`, {credentials: 'same-origin'})
        .then(response => response.ok ? response.json() : new UserException('Bad Fetch'))
      )
    )
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

    return(
      <Grid>
        <Row>
          <Col sm={12} lg={6}>
            <div className="search-container">
              <form onSubmit={this.searchTrails} className="trail-search-form">
                <label htmlFor="search"></label>
                <input className="text" name="search" placeholder="Search" value={this.state.search} onChange={this.handleItemChange}/>
                <input className="search-button button" type="submit" value="List Results"/>
              </form>
              <br/>
              <div className="map">
                {map}
              </div>
            </div>
          </Col>

          <Col sm={12} lg={6} className="trail-search-list">
            <SearchedTrails />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect()(TrailSearchContainer)
