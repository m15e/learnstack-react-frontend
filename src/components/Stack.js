import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoZap, GoFlame, GoX } from 'react-icons/go';

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
        <div className="stack-bg">
          <div className="favorite-icon">
            {setFavorite ? <GoFlame className='flame-icon flame-on' /> : <GoFlame className='flame-icon' />}
          </div> 
          <div className="delete-btn">
            <button className='delete-stack' onClick={() => handleDeleteStack(id)}><GoX /></button>  
          </div>
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
          {setFavorite ? 
                      <button className="button is-small set-fave" onClick={() => handleFavoriteStack(id,false)}><GoFlame className='flame-icon' />&nbsp; Remove favorite</button>:
                      <button className="button is-small set-fave" onClick={() => handleFavoriteStack(id,true)}><GoFlame className='flame-icon' />&nbsp; Add to favorites</button>}
        </div>
      </div>    
  );
};

export default Stack;

{/* <button className='button is-rounded' onClick={() => handleDeleteStack(id)}><GoX /></button>
      {setFavorite ? 
        <button onClick={() => handleFavoriteStack(id,false)}>UnFavorite Stack</button>:
        <button onClick={() => handleFavoriteStack(id,true)}>Favorite Stack</button>}  */}
