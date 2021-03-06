import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStack, deleteLink, getFavorites, favoriteStack, unFavoriteStack } from '../actions';
import LinkForm from './LinkForm';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { GoChevronLeft, GoFlame, GoX } from 'react-icons/go';

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
  }, [getStack, setIsFavorite, user]);

  const linkArray = stack.links ? stack.links.map(link => (
    <div className="link" key={link.id}>     
      <h3>{link.title}</h3>      
      <p className='link-medium'> <span className='tag is-rounded is-primary'>{link.medium}</span></p>
      <a href={link.url} target='_blank' className='button is-rounded lb-white link-button'>Open link</a>      
      {user && <button className='delete-link' onClick={() => handleDeleteLink(link.id)}><GoX /></button>} 
    </div>
  )) : <p className='no-links'>No links in this stack yet</p>;
  
  return (
    <div className='stack-page'>      
      <Link to={'/stacks'} className='back-to-stacks'><GoChevronLeft /></Link>
      <Navigation />
        <div className="container is-max-desktop">
        <div className="favorite-icon">
          {user && <button className="button set-fave-page is-rounded" onClick={handleFavorite}><GoFlame />&nbsp; {isFavorite ? 'Remove from favorites' : 'Add to favorites'}</button>}
        </div>
        <h3 className="title">{ stack.title }</h3>
        {user && <div className='fave-icon-page'>{ isFavorite ? <><GoFlame className='flame-icon flame-on' />&nbsp;Favorited Stack</> : <><GoFlame className='flame-icon' />&nbsp;Not in favorites</> }</div>} 
        <div className="stack-tags">
          {stack.tags && stack.tags.split(' ').map(tag => (<span key={tag} className='tag is-rounded stack-tag'>{tag}</span>))}
        </div>
        
        <div className="link-array">
          {linkArray}
        </div>
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