import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import isEmpty from 'lodash/isEmpty';
import { Navbar, NavbarBrand } from 'reactstrap';

import logo from '../../images/SmashBall.svg';

export class AppContainer extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  async componentWillMount(){
    const { actions } = this.props;
    await actions.requestData();
    actions.setLoading(false)
  }

  render() {
    const { common, children } = this.props;
    const { characters, questions, answers } = common;
    const noData = isEmpty(characters) || isEmpty(questions) || isEmpty(answers);

    if(noData){
      return (
        <h1>Loading...</h1>
      );
    }

    return (
      <div className="common-app-container pb-5">
        <Navbar className="mb-4 container">
          <NavbarBrand href={ process.env.NODE_ENV === 'production' ? '/ssbu-character-selector' : '/'}>
            <img src={logo} alt="smash ball" style={{ width: '80px', height: 'auto'}} className="mr-3" />
            SSBU - Character Selector Quiz
          </NavbarBrand>
        </Navbar>
        { children }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
