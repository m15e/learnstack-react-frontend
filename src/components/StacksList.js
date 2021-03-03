import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteStack, getStacks } from '../actions';
import Stack from './Stack';
import StacksForm from './StacksForm';

const StacksList = props => {  
  const { stacks, getStacks, user, deleteStack } = props;
  const loggedInUser = localStorage.getItem('user');

  useEffect(() => {
    getStacks();    
  }, []);

  const handleDeleteStack = id => {
    const data = { id, auth: `Bearer ${user.token}` };
    deleteStack(data);
  };


  const stackArray = stacks.items.map(stack => (
    <Stack key={stack.id} 
           id={stack.id} 
           title={stack.title} 
           tags={stack.tags} 
           links={stack.links.length}
           handleDeleteStack={handleDeleteStack} />
  ));

  return (
    <>
      <div className='container is-max-desktop'>                  
        <h3 className="title is-4">What would you like to learn?</h3>    
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
});

const mapDispatchToProps = dispatch => ({
  getStacks: () => dispatch(getStacks()),
  deleteStack: data => dispatch(deleteStack(data)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);