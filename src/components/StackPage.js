import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoChevronLeft, GoFlame, GoX } from 'react-icons/go';
import PropTypes from 'prop-types';
import {
  getStack, deleteLink, getFavorites, favoriteStack, unFavoriteStack,
} from '../actions';
import LinkForm from './LinkForm';
import Navigation from './Navigation';

const StackPage = props => {
  const {
    user, stack, favorites, getStack, deleteLink, getFavorites, favoriteStack, unFavoriteStack,
  } = props;

  const stackId = parseInt(window.location.href.split('/stack/').splice(1).toString(), 10);

  const isStackOwner = user ? user.id === stack.user_id : false;

  const [isFavorite, setIsFavorite] = useState(user && favorites.some(f => f.stack_id === stackId));

  const handleDeleteLink = linkId => {
    const data = { id: linkId, auth: `Bearer ${user.token}` };
    deleteLink(data);
  };

  const handleFavorite = () => {
    const data = { id: stackId, auth: `Bearer ${user.token}` };
    if (isFavorite) {
      unFavoriteStack(data);
    } else {
      favoriteStack(data);
    }
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    getStack(stackId);
    if (user) {
      getFavorites(user.id);
      setIsFavorite(favorites.some(f => f.stack_id === stackId));
    }
  }, [getStack, setIsFavorite, user]);

  const linkArray = stack.links ? stack.links.map(link => (
    <div className="link" key={link.id}>
      <h3>{link.title}</h3>
      <p className="link-medium">
        <span className="tag is-rounded is-primary">{link.medium}</span>
      </p>
      <a href={link.url} target="_blank" rel="noreferrer" className="button is-rounded lb-white link-button">Open link</a>
      {isStackOwner && <button type="button" className="delete-link" aria-label="delete" onClick={() => handleDeleteLink(link.id)}><GoX /></button>}
    </div>
  )) : <p className="no-links">No links in this stack yet</p>;

  return (
    <div className="stack-page">
      <Link to="/stacks" className="back-to-stacks"><GoChevronLeft /></Link>
      <Navigation />
      <div className="container is-max-desktop">
        <div className="favorite-icon">
          {user && (
            <button type="button" className="button set-fave-page is-rounded" onClick={handleFavorite}>
              <GoFlame />
&nbsp;
              {' '}
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          )}
        </div>
        <h3 className="title">{ stack.title }</h3>
        {user && (
        <div className="fave-icon-page">
          { isFavorite ? (
            <>
              <GoFlame className="flame-icon flame-on" />
&nbsp;Favorited Stack
            </>
          ) : (
            <>
              <GoFlame className="flame-icon" />
&nbsp;Not in favorites
            </>
          ) }
        </div>
        )}
        <div className="stack-tags">
          {stack.tags && stack.tags.split(' ').map(tag => (<span key={tag} className="tag is-rounded stack-tag">{tag}</span>))}
        </div>

        <div className="link-array">
          {linkArray}
        </div>
        {isStackOwner && <LinkForm />}
      </div>
    </div>
  );
};

StackPage.defaultProps = {
  stack: {
    title: 'Stack Name',
    tags: 'stack tags',
    user_id: 1,
    links: [],
  },
  user: {
    username: '',
    id: '',
    token: '',
  },
};

StackPage.propTypes = {
  getStack: PropTypes.func.isRequired,
  deleteLink: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  favoriteStack: PropTypes.func.isRequired,
  unFavoriteStack: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
  }),
  stack: PropTypes.shape({
    title: PropTypes.string,
    user_id: PropTypes.number,
    tags: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
  }),
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  stack: state.stack,
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
