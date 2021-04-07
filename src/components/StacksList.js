import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Stack from './Stack';
import StacksForm from './StacksForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  deleteStack, getStacks, getFavorites, favoriteStack, unFavoriteStack, toastMessage
} from '../actions';

const StacksList = props => {
  const {
    stacks, getStacks, user, deleteStack, favorites, getFavorites, favoriteStack, unFavoriteStack, message, toastMessage
  } = props;
  const loggedInUser = localStorage.getItem('user');

  const [loggedIn, setLoggedIn] = useState(false);  

  useEffect(() => {
    getStacks();    
    if (user) {
      const storedUser = JSON.parse(loggedInUser);
      if (storedUser) {
        getFavorites(storedUser.id);
        setLoggedIn(true);

        if (message === "Welcome, login successful!") {
          toast.info(message);
          toastMessage('');
        };
      }      
    }
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
    }
  };

  const stackArray = stacks.map(stack => (
    <Stack
      key={stack.id}
      userId={user.id}
      id={stack.id}
      title={stack.title}
      tags={stack.tags}
      links={stack.links.length}
      stackOwner={user.id === stack.user_id}
      handleDeleteStack={handleDeleteStack}
      setFavorite={user ? favorites.some(fav => fav.stack_id === stack.id) : false}
      handleFavoriteStack={handleFavoriteStack}
    />
  ));

  return (
    <>
      <ToastContainer />
      <div className="container is-max-desktop">
        <h3 className="title is-4 stack-list-title">What would you like to learn?</h3>
        <div className="stack-container">{stackArray}</div>
      </div>
      {loggedInUser
        && <StacksForm />}
    </>
  );
};

const mapStateToProps = state => ({
  stacks: state.stacks,
  user: state.user,
  favorites: state.favorites,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  getStacks: () => dispatch(getStacks()),
  deleteStack: data => dispatch(deleteStack(data)),
  getFavorites: data => dispatch(getFavorites(data)),
  favoriteStack: data => dispatch(favoriteStack(data)),
  unFavoriteStack: data => dispatch(unFavoriteStack(data)),
  toastMessage: message => dispatch(toastMessage(message)),
});

// StacksList.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     token: PropTypes.string.isRequired,
//   }).isRequired,
//   stacks: PropTypes.shape({
//     items: PropTypes.arrayOf(PropTypes.object).isRequired,
//   }).isRequired,
//   favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
//   getStacks: PropTypes.func.isRequired,
//   deleteStack: PropTypes.func.isRequired,
//   getFavorites: PropTypes.func.isRequired,
//   favoriteStack: PropTypes.func.isRequired,
//   unFavoriteStack: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);
