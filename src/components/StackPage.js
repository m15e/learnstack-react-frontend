import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStack } from '../actions';
import LinkForm from './LinkForm';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { GoChevronLeft } from 'react-icons/go';

const StackPage = props => {
  const { stack, getStack, user } = props;
  
  const stackId = window.location.href.split('/stack/').splice(1).toString();
  const data = { id: stackId };

  useEffect(() => {
    getStack(data);    
  }, []);

  return (
    <div className='stack-page'>
      <Link to={'/stacks'} className='back-to-stacks'><GoChevronLeft /></Link>
      <Navigation />
      <div className="container is-max-desktop">        
        <h3 className="title">{ stack.title }</h3>
        {user.id == stack.user_id && <LinkForm />}
      </div>
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