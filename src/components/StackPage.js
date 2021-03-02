import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStack } from '../actions';
import LinkForm from './LinkForm';
import { Link } from 'react-router-dom';

const StackPage = props => {
  const { stack, getStack, user } = props;
  
  const stackId = window.location.href.split('/stack/').splice(1).toString();
  const data = { id: stackId, token: user.token };

  useEffect(() => {
    getStack(data);    
  }, []);

  return (
    <div className='stack-page'>
      <Link to={'/'}>Back</Link>
      <h4>Stack page</h4>
      <LinkForm />
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  stack: state.stacks.item,
});

const mapDispatchToProps = dispatch => ({  
  getStack: data => dispatch(getStack(data)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(StackPage);