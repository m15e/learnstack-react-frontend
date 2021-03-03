import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createLink } from '../actions';

const LinkForm = props => {

  const [linkParams, setLinkParams] = useState({});  
  
  const { user, stack, createLink } = props;  

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
      url: linkParams.url,      
      medium: linkParams.medium,
      stack_id: stack.id,
    };

    const data = { link: link, auth: `Bearer ${user.token}` };
    
    createLink(data);
    
    e.target.reset();
  };

  return (
    <>      
      <h3>Add link:</h3>
      <form onSubmit={handleSubmit}>        
        <input type="text" className="input is-rounded" name="title" placeholder="title" onChange={onChange} />        
        <input type="text" className="input is-rounded" name="url" placeholder="url" onChange={onChange} />
        <input type="text" className="input is-rounded" name="medium" placeholder="medium" onChange={onChange} />
        <button type="submit" className="button is-rounded orange-white">Add link</button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stack: state.stacks.item,
});

const mapDispatchToProps = dispatch => ({
  createLink: link => dispatch(createLink(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm);