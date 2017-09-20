import React from 'react';

const HikeTile = props => {

  let geography;

  if(props.latitude && props.longitude){
    geography =
    <div>
      <h5>Geography:</h5>
      <ul>
        <li>Latitude: {props.latitude}</li>
        <li>Longitude: {props.longitude}</li>
      </ul>
    </div>
  }

  return(
    <div>
      <div className="trail-list" onClick={props.handleClick}>
        <h4>{props.name}</h4>
        <p>{props.rating}</p>
        <p>{props.address}</p>
        {geography}
      </div>

      <hr/>
    </div>
  )
}

export default HikeTile;
