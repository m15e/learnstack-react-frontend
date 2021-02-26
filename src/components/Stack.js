import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Stack = props => {
  const { title, tags, id } = props;

  

  return (
    <div className='stack'>
      <h3>{ title }</h3>
      <p>{ tags }</p>
      <Link to={`/stack/${id}`}>Link</Link>
    </div>
  );
};

export default Stack;