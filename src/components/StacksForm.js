import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStack } from '../actions';

const StacksForm = props => {

  const [state, setState] = useState({});  

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {    
    e.preventDefault();
    
    const stack = {
      title: state.title,
      tags: state.tags,      
    };

    props.createStack(stack);
    
    e.target.reset();
  };

  return (
    <>      
      <h3>Stack form:</h3>
      <form onSubmit={handleSubmit}>        
        <input type="text" name="title" placeholder="title" onChange={onChange} />
        <input type="text" name="tags" onChange={onChange} />
        <button type="submit">Create Stack</button>
      </form>
    </>
  )
};

const mapDispatchToProps = dispatch => ({
  createStack: stack => dispatch(createStack(stack)),  
});

export default connect(state => ({}), mapDispatchToProps)(StacksForm);