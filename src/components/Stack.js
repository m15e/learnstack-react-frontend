import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoZap, GoFlame } from 'react-icons/go';

const Stack = props => {
  const { title, tags, id, links, handleDeleteStack, handleFavoriteStack, setFavorite } = props;

  //const [isFavorite, setIsFavorite] = useState();  

  const tagArray = tags.split(' ').map(tag => (<span key={tag} className='tag is-rounded stack-tag'>{tag}</span>));

  const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

  return (
    <div className='stack tile box'>
      <button onClick={() => handleDeleteStack(id)}>Delete Stack</button>
      {setFavorite ? 
        <button onClick={() => handleFavoriteStack(id,false)}>UnFavorite Stack</button> :
        <button onClick={() => handleFavoriteStack(id,true)}>Favorite Stack</button>} 
      <div className="favorite-icon">
        {setFavorite ? <GoFlame className='flame-icon flame-on' /> : <GoFlame className='flame-icon' />}
      </div>
      <div className="stack-bg">
        
      </div>
      <div className="stack-content">
        <h3>{ title }</h3>
        <p>{ tagArray }</p>
        <div className="columns">           
          <div className="column">
            <GoFlame />            
            <span>{getRandomInt(0,127)}<br/> Favorited</span>
          </div>          
          <div className="column">
            <GoZap />
            <span>{links} Resources</span>
          </div>
        </div>
                 
        <Link to={`/stack/${id}`} className='button is-rounded lb-white is-small stack-link'>View Collection</Link>
      </div>
    </div>
  );
};

export default Stack;