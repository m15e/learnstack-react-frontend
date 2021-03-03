import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStacks } from '../actions';
import Stack from './Stack';
import StacksForm from './StacksForm';

const StacksList = props => {  
  const { stacks, getStacks } = props;
  const loggedInUser = localStorage.getItem('user');

  useEffect(() => {
    getStacks();    
  }, []);


  const stackArray = stacks.items.map(stack => (
    <Stack key={stack.id} id={stack.id} title={stack.title} tags={stack.tags} links={stack.links.length} />
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
});

const mapDispatchToProps = {
  getStacks,
}

export default connect(mapStateToProps, mapDispatchToProps)(StacksList);