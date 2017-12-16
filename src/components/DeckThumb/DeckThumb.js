import React from 'react';
import { Link } from 'react-router-dom';
// TODO
const DeckThumb = props => {

  return (
    <div className="DeckThumb">{props.name} <Link to={{ pathname: "/editor/" + props.name }}>Open</Link></div>
  )
}

export default DeckThumb;