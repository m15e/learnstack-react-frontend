import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStack } from '../actions';
import { GoBeaker } from 'react-icons/go';

const StacksForm = props => {

  const [stackParams, setStackParams] = useState({});  
  
  const { user, createStack } = props;  

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
      user_id: user.id,    
    };

    const data = { stack: stack, auth: `Bearer ${user.token}` };
    
    createStack(data);
    
    e.target.reset();
  };

  return (
    <div className='container is-fluid stack-form'>       
      <nav className="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
        <div className="container is-max-desktop">
          <div className="navbar-brand">            
            <h4 className='title is-5'><GoBeaker /> Create a Stack</h4>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <form onSubmit={handleSubmit} className='is-flex'>        
                <input type="text" className="input is-rounded" name="title" placeholder="Add title" onChange={onChange} />
                <input type="text" className="input is-rounded" name="tags" placeholder="Add tags separated by spaces" onChange={onChange} />
                <button type="submit" className="button is-rounded orange-white">Create Stack</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createStack: stack => dispatch(createStack(stack)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(StacksForm);