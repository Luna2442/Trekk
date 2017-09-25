import React from 'react';

const HikeTile = props => {

  let deleteHike = () => {
    let path = location.pathname
    fetch(`/api/v1/${path}/hikes/${props.id}`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    props.aggregateHikes()
  }

  let geography;
  let deleteButton;
  if(props.latitude && props.longitude){
    geography =
    <div>
      <h5>Geography:</h5>
      <ul>
        <li>Latitude: {props.latitude}</li>
        <li>Longitude: {props.longitude}</li>
      </ul>
    </div>
    deleteButton = <input type='button' className="button delete-button" defaultValue='Remove this hike' onClick={deleteHike} />
  }

  return(
    <div>
      <div className="hike" onClick={props.handleClick}>
        <h4>{props.name}</h4>
        <p>{props.rating}</p>
        <p>{props.address}</p>
        {geography}
      </div>
      {deleteButton}
      <hr/>
    </div>
  )
}

export default HikeTile;
