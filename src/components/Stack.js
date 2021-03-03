import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoZap, GoFlame, GoChevronUp, GoChevronDown } from 'react-icons/go';

const Stack = props => {
  const { title, tags, id, links } = props;

  const tagArray = tags.split(' ').map(tag => (<span key={tag} className='tag is-rounded stack-tag'>{tag}</span>));

  return (
    <div className='stack tile box'>
      <div className="stack-bg">
        
      </div>
      <div className="stack-content">
        <h3>{ title }</h3>
        <p>{ tagArray }</p>
        <div className="columns">           
          <div className="column">
            <GoChevronUp />
            <span>15 Upvotes</span>
          </div>
          <div className="column">
            <GoChevronDown />
            <span>3 Downvotes</span>
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