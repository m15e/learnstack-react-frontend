import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getStacks } from '../actions';

const StacksList = props => {

  const handleClick = e => {
    e.preventDefault();
    console.log('from clickHandler')
    props.getStacks();    
  };

  return (
    <>      
      <h3>Stack List</h3>    
      <button onClick={handleClick}>Stack Call</button> 
    </>
  );

};

const mapStateToProps = state => ({
  stacks: state.stacks,
});

const mapDispatchToProps = {
  getStacks,
}

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);