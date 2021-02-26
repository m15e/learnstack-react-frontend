import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createLink } from '../actions';

const LinkForm = props => {

  const [linkParams, setLinkParams] = useState({});  
  
  const { user, createLink } = props;  

  const onChange = e => {
    setLinkParams({
      ...linkParams,
      [e.target.name]: e.target.value,
    });
  };  

  const handleSubmit = e => {    
    e.preventDefault();    
    
    const link = {
      title: linkParams.title,
      tags: linkParams.tags,      
    };

    const data = { link: link, auth: `Bearer ${user.token}` };
    
    createLink(data);
    
    e.target.reset();
  };

  return (
    <>      
      <h3>Link form:</h3>
      <form onSubmit={handleSubmit}>        
        <input type="text" name="title" placeholder="title" onChange={onChange} />
        <input type="text" name="tags" onChange={onChange} />
        <button type="submit" className="button">Create link</button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  createlink: link => dispatch(createLink(link)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm);