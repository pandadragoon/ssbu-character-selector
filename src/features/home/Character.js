import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../common/history';
import * as actions from './redux/actions';
import { Card, CardImg, CardBody, CardTitle, CardText, Button} from 'reactstrap';

import AppContainer from '../common/AppContainer';

export class Character extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { match, common } = this.props;
    const { characters, answers } = common;
    const { id } = match.params;
    const character = characters[id];

    return (
      <AppContainer>
        {
          !common.loading ?
          <div className="home-character container">
            <h1 className="text-uppercase">Congratulations</h1>
            <h2 className="text-bold">Your character is:</h2>
            <Card className="w-50">
              {/* TODO: <CardImg /> */}
              <CardBody>
                <CardTitle>{character.name}</CardTitle>
              </CardBody>
            </Card>
            {
              character.answer ? 
              <Button color="primary" onClick={()=> history.push(`/character/${answers[character.answer].character}`)} className="w-50 p-3 mt-3">
                { answers[character.answer].text }
              </Button>
              :
              null
            }

            {
              character.id !== 69 ?
              <Button color="primary" onClick={()=> history.push(`/character/${answers['119'].character}`)} className="w-50 p-3 mt-3 d-block">
                { answers[119].text }
              </Button>
              :
              null
            }

            <Button color="primary" onClick={()=> history.push(`/question/1`)} className="w-50 p-3 mt-3 d-block">
              Go Back To The Beginning
            </Button>

            <Button 
              color="danger" 
              onClick={()=> history.goBack()}
              className="p-3 w-25 mt-5"
            >
              Back
            </Button>
          </div>
          :
          null
        }
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Character);
