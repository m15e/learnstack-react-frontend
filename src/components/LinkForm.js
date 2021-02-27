import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//import { createLink } from '../actions';

const LinkForm = props => {

  const [linkParams, setLinkParams] = useState({});  
  
  const { user, stack } = props;  

  // const createLink = data => axios({
  //   method: 'post',
  //   url: 'http://localhost:3000/api/v1/links',
  //   headers: {
  //         'authorization': data['auth'],
  //         'Content-Type': 'application/json'
  //   },
  //   data: {
  //     link: JSON.stringify(data['link']),
  //   },
  // }).then(response => {
  //   console.log(response.data);
  // }).catch(error => console.log(error));

  const createLink = data => console.log(data);

  const onChange = e => {
    setLinkParams({
      ...linkParams,
      [e.target.name]: e.target.value,
    });
  };  

  const handleSubmit = e => {    
    e.preventDefault();    
    
    console.log(stack);

    const link = {
      title: linkParams.title,
      tags: linkParams.tags,
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
      <h3>Link form:</h3>
      <form onSubmit={handleSubmit}>        
        <input type="text" name="title" placeholder="title" onChange={onChange} />
        <input type="text" name="tags" placeholder="tags" onChange={onChange} />
        <input type="text" name="url" placeholder="url" onChange={onChange} />
        <input type="text" name="medium" placeholder="medium" onChange={onChange} />
        <button type="submit" className="button">Create link</button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stack: state.stacks.item,
});

const mapDispatchToProps = {
  //createLink,
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkForm);