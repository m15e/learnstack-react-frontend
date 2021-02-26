import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStack } from '../actions';

const StacksForm = props => {

  const [stackParams, setStackParams] = useState({});  
  
  const { user } = props;  

  const onChange = e => {
    setStackParams({
      ...stackParams,
      [e.target.name]: e.target.value,
    });
  };  

  const handleSubmit = e => {    
    e.preventDefault();    
    
    const stack = {
      title: stackParams.title,
      tags: stackParams.tags,      
    };

    const data = { stack: stack, auth: `Bearer ${user.token}` };
    
    props.createStack(data);
    
    e.target.reset();
  };

  return (
    <>      
      <h3>Stack form:</h3>
      <form onSubmit={handleSubmit}>        
        <input type="text" name="title" placeholder="title" onChange={onChange} />
        <input type="text" name="tags" onChange={onChange} />
        <button type="submit" className="button">Create Stack</button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createStack: stack => dispatch(createStack(stack)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(StacksForm);