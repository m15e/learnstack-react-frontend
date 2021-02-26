import React, { useState } from 'react';
import { connect } from 'react-redux';

const Stack = props => {
  const { title, tags } = props;

  // const taglist = 

  return (
    <div className='stack'>
      <h3>{ title }</h3>
      <p>{ tags }</p>
    </div>
  );
};

export default Stack;