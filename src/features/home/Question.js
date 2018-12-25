import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import history from '../../common/history';
import { Button } from 'reactstrap';

import AppContainer from '../common/AppContainer';

export class Question extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSelectAnswer(answer){
    if(answer.question){
      history.push(`/question/${answer.question}`);
    } else if(answer.character){
      history.push(`/character/${answer.character}`)
    }
  }

  render() {
    const { match, common } = this.props;
    const { questions, answers } = common;
    const { id } = match.params;
    const question = questions[id];

    return (
      <AppContainer>
        {
          !common.loading ? 
          <div className="home-question container">
            <h2 className="mb-4">{question.text}</h2>
            <ul style={{listStyleType: "none", padding: 0}}>
              {
                question.answers.map(answer => {
                  const selectedAnswer = answers[answer];
                  return (
                    <li key={selectedAnswer.id} className="mt-3">
                      <Button 
                        onClick={this.handleSelectAnswer.bind(this, selectedAnswer)}
                        color="primary"
                        className="w-50 p-3"
                      >
                        {selectedAnswer.text}
                      </Button>
                    </li>
                  )
                })
              }
            </ul>
            {
              question.id === 1 ?
              null
              :
              <Button color="success" onClick={()=> history.push(`/question/1`)} className="w-50 p-3 mt-3 d-block">
                Go Back To The Beginning
              </Button>
            }
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
)(Question);
