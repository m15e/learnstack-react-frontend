import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStack } from '../actions';

const StackPage = props => {
  const { stack, getStack } = props;
  
  const stackId = window.location.href.split('/stack/').splice(1).toString();

  useEffect(() => {
    getStack(stackId);
  }, [stackId, getStack]);

  return (
    <div className='stack-page'>
      <h4>Stack page</h4>
    </div>
  );
};

const mapStateToProps = state => ({
  stack: state.stacks.item,
});

const mapDispatchToProps = {
  getStack,
}

export default connect(mapStateToProps, mapDispatchToProps)(StackPage);