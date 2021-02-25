import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getStacks } from '../actions';

const StacksList = props => {
  return (
    <>      
      <h3>Stack List</h3>     
    </>
  );

};

const mapStateToProps = state => ({
  stacks: state.stacks,
});

const mapDispatchToProps = dispatch => ({
  getStacks: dispatch(getStacks),  
});

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);