import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStacks } from '../actions';
import Stack from './Stack';

const StacksList = props => {  
  const { stacks, getStacks } = props;

  useEffect(() => {
    getStacks();
    console.log(stacks);
  }, []);


  const stackArray = stacks.items.map(stack => (
    <Stack key={stack.id} id={stack.id} title={stack.title} tags={stack.tags} />
  ));

  return (
    <>            
      <h3 className="title is-4">Learning collections</h3>    
      <div className="stack-container">{stackArray}</div>
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