import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStack } from '../actions';
import LinkForm from './LinkForm';

const StackPage = props => {
  const { stack, getStack, user } = props;
  
  const stackId = window.location.href.split('/stack/').splice(1).toString();
  const data = { id: stackId, token: user.token };

  useEffect(() => {
    getStack(data);
    console.log(data['token']);
  }, [stackId, getStack]);

  return (
    <div className='stack-page'>
      <h4>Stack page</h4>
      <LinkForm />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stack: state.stacks.item,
});

const mapDispatchToProps = {
  getStack,
}

export default connect(mapStateToProps, mapDispatchToProps)(StackPage);