import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Jumbotron, Button } from 'reactstrap';
import history from '../../common/history';
import logo from '../../images/SmashLogo.svg';

import AppContainer from '../common/AppContainer';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <AppContainer>
        <div className="home-default-page container pt-4">
          <Jumbotron className="text-center">
            <h2>Welcome to the character selector quiz <br /> from Super Smash Bros. Ultimate</h2>
            <img src={logo} alt="smash ultimate logo" className="mt-5 mb-5 home-default-page__logo w-50" />
            <Button color="danger" onClick={()=> history.push('question/1')} className="mt-5 w-75 p-3">Let's get started</Button>
          </Jumbotron>
        </div>
      </AppContainer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    common: state.common
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
