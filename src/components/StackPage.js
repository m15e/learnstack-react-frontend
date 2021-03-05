import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStack, deleteLink, getFavorites, favoriteStack, unFavoriteStack } from '../actions';
import LinkForm from './LinkForm';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { GoChevronLeft, GoFlame } from 'react-icons/go';

const StackPage = props => {
  const { user, stack, favorites, getStack, deleteLink, getFavorites, favoriteStack, unFavoriteStack } = props;
  
  const stackId = parseInt(window.location.href.split('/stack/').splice(1).toString());
  
  const isStackOwner = user ? user.id == stack.user_id : false;        
  
  const [isFavorite, setIsFavorite] = useState(user && favorites.includes(stackId));  


  const handleDeleteLink = linkId => {
    const data = { id: linkId, auth: `Bearer ${user.token}` };
    deleteLink(data);
  };

  const handleFavorite = () => {
    const data = { id: stackId.toString(), auth: `Bearer ${user.token}` };
    if (isFavorite) {
      unFavoriteStack(data);
    } else {
      favoriteStack(data);
    };
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {    
    getStack(stackId);   
    if (user) {
      getFavorites(user.id);
      setIsFavorite(favorites.includes(stackId));
    }
  }, [getStack, setIsFavorite]);

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
        <div className="favorite-icon">
          <button onClick={handleFavorite}>{isFavorite ? 'UnFavorite' : 'Favorite'}</button>
        </div>
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
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({  
  getStack: data => dispatch(getStack(data)),
  deleteLink: data => dispatch(deleteLink(data)),
  getFavorites: data => dispatch(getFavorites(data)),
  favoriteStack: data => dispatch(favoriteStack(data)),  
  unFavoriteStack: data => dispatch(unFavoriteStack(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackPage);