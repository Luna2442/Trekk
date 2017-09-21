import React from 'react';

const NoteTile = props => {

  return(
    <div>
      <h3>{props.header}</h3>
      <p>{props.body}</p>
    </div>
  )
}

export default NoteTile;
