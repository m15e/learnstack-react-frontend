import React from 'react';
import { Link } from 'react-router-dom';
import { GoZap, GoFlame, GoX } from 'react-icons/go';
import PropTypes from 'prop-types';

const Stack = props => {
  const {
    title, tags, id, links, handleDeleteStack, handleFavoriteStack, setFavorite, stackOwner,
  } = props;
  const tagArray = tags.split(' ').map(tag => (<span key={tag} className="tag is-rounded stack-tag">{tag}</span>));

  const getRandomInt = (min, max) => Math.floor(Math.random()
                                     * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));  

  const favoriteButton = setFavorite
    ? (
      <button type="button" className="button is-small set-fave" onClick={() => handleFavoriteStack(id, false)}>
        <GoFlame className="flame-icon" />
&nbsp; Remove favorite
      </button>
    ) : (
      <button type="button" className="button is-small set-fave" onClick={() => handleFavoriteStack(id, true)}>
        <GoFlame className="flame-icon" />
&nbsp; Add to favorites
      </button>
    );

  const bgURL = `url('https://source.unsplash.com/1024x768/?${tags.split(' ')[0]}')`

  const divBg = {    
    backgroundImage: bgURL,
  };

  return (
    <div className="stack tile box">      
      <div className="stack-bg" style={divBg}>
        <div className="favorite-icon">
          {setFavorite ? <GoFlame className="flame-icon flame-on" /> : <GoFlame className="flame-icon" />}
        </div>
        {stackOwner && (
          <>
            <div className="delete-btn">
              <button type="button" aria-label="Close" className="delete-stack" onClick={() => handleDeleteStack(id)}><GoX /></button>
            </div>
          </>
        )}
      </div>
      <div className="stack-content">
        <h3>{ title }</h3>
        <p>{ tagArray }</p>
        <div className="columns">
          <div className="column is-half">
            <GoFlame />
            <span>
              {getRandomInt(0, 127)}
              <br />
              {' '}
              Favorited
            </span>
          </div>
          <div className="column is-half">
            <GoZap />
            <span>
              {links}
              <br />
              {' '}
              Resources
            </span>
          </div>
        </div>
        <div className="stack-actions">
          {favoriteButton}
          <Link to={`/stack/${id}`} className="button is-rounded orange-white is-small stack-link">View Collection</Link>
        </div>
      </div>
    </div>
  );
};

Stack.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  links: PropTypes.number.isRequired,
  handleDeleteStack: PropTypes.func.isRequired,
  handleFavoriteStack: PropTypes.func.isRequired,
  setFavorite: PropTypes.bool.isRequired,
  stackOwner: PropTypes.bool.isRequired,
};

export default Stack;
