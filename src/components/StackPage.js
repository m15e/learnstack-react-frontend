import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStack, deleteLink } from '../actions';
import LinkForm from './LinkForm';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { GoChevronLeft } from 'react-icons/go';

const StackPage = props => {
  const { user, stack, getStack, upvoteStack, deleteLink } = props;
  
  const stackId = window.location.href.split('/stack/').splice(1).toString();
  const data = stackId;
  const isStackOwner = user ? user.id == stack.user_id : false;  
  const [isFavorite, setIsFavorite] = useState(false);


  const handleDeleteLink = linkId => {
    const data = { id: linkId, auth: `Bearer ${user.token}` };
    deleteLink(data);
  };

  useEffect(() => {
    getStack(stackId);   
    setIsFavorite(user.favorites && user.favorites.includes(parseInt(stackId)));   
  }, [getStack]);

  const linkArray = stack.links ? stack.links.map(link => (
    <div className="link" key={link.id}>     
      <button onClick={() => handleDeleteLink(link.id)}>Delete Link</button> 
      <h3>{link.title}</h3>      
      <p className='link-medium'>Media Type: <span className='tag is-rounded is-primary'>{link.medium}</span></p>
      <a href={link.url} target='_blank' className='button is-rounded lb-white link-button'>View Resource</a>      
    </div>
  )) : <p className='no-links'>No links in this stack yet</p>;
  
  return (
    <div className='stack-page'>      
      <Link to={'/stacks'} className='back-to-stacks'><GoChevronLeft /></Link>
      <Navigation />
      <div className="container is-max-desktop">
        <button onClick={() => console.log('click')} className='favorite-button'>Add to favorites</button>   
        <h3 className="title">{ stack.title }</h3>
        <p>is fave: { isFavorite ? 'yes' : 'no' }</p>
        {stack.tags && stack.tags.split(' ').map(tag => (<span key={tag} className='tag is-rounded stack-tag'>{tag}</span>))}
        {linkArray}
        {isStackOwner && <LinkForm />}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stack: state.stacks.item,
});

const mapDispatchToProps = dispatch => ({  
  getStack: data => dispatch(getStack(data)),
  deleteLink: data => dispatch(deleteLink(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackPage);