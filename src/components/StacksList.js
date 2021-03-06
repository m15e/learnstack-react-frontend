import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteStack, getStacks, getFavorites, favoriteStack, unFavoriteStack } from '../actions';
import Stack from './Stack';
import StacksForm from './StacksForm';

const StacksList = props => {  
  const { stacks, getStacks, user, deleteStack, favorites, getFavorites, favoriteStack, unFavoriteStack } = props;
  const loggedInUser = localStorage.getItem('user');
  
  
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getStacks();
    if (user) {     
      const stored_user = JSON.parse(loggedInUser);
      if (stored_user) {
        getFavorites(stored_user.id);
        setLoggedIn(true);
      }
    };
  }, []);  

  const handleDeleteStack = id => {
    const data = { id, auth: `Bearer ${user.token}` };
    deleteStack(data);
  };

  const handleFavoriteStack = (id, isFavorite) => { 
    const data = { id, auth: `Bearer ${user.token}`, user };
    if (isFavorite) {
      favoriteStack(data);
    } else {
      unFavoriteStack(data);
    };
  };

  const stackArray = stacks.items.map(stack => (
    <Stack key={stack.id} 
           id={stack.id} 
           title={stack.title} 
           tags={stack.tags} 
           links={stack.links.length}
           loggedIn={loggedIn}
           handleDeleteStack={handleDeleteStack}
           setFavorite={user ? favorites.includes(parseInt(stack.id)) : false}
           handleFavoriteStack={handleFavoriteStack} />
  ));

  return (
    <>
      <div className='container is-max-desktop'>                  
        <h3 className="title is-4 stack-list-title">What would you like to learn?</h3>    
        <div className="stack-container">{stackArray}</div>
      </div>
      {loggedInUser && 
        <StacksForm />
      }
    </>
  );

};

const mapStateToProps = state => ({
  stacks: state.stacks,
  user: state.user,
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => ({
  getStacks: () => dispatch(getStacks()),
  deleteStack: data => dispatch(deleteStack(data)), 
  getFavorites: data => dispatch(getFavorites(data)),
  favoriteStack: data => dispatch(favoriteStack(data)),
  unFavoriteStack: data => dispatch(unFavoriteStack(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);