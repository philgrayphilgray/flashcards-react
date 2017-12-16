import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actions';

class Card extends Component {

  questionChangeHandler = (e) => {
    this.props.onChangeQuestion(e.target.value, this.props.id);
  }

  answerChangeHandler = (e) => {
    this.props.onChangeAnswer(e.target.value, this.props.id);
  }

  deleteCardHandler = () => {
    this.props.onDeleteCard(this.props.id);
  }
  render() {

    return (
      <div className="Card" >
        <h3>Card #{this.props.id}</h3>
                <p>Score: {(((this.props.attempts - this.props.peeks)/this.props.attempts) * 100).toFixed(0)}%</p>
        <div className="form-group">
          <div>
            <label>Question: </label>
            <textarea value={this.props.question} onChange={this.questionChangeHandler} />
          </div>
          <div>
            <label>Answer: </label>
            <textarea value={this.props.answer} onChange={this.answerChangeHandler} />
          </div>
        </div>
        <button onClick={this.deleteCardHandler}>DELETE</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeQuestion: (newText, id) => dispatch(actionCreators.onChangeQuestion(newText, id)),
    onChangeAnswer: (newText, id) => dispatch(actionCreators.onChangeAnswer(newText, id)),
    onDeleteCard: id => dispatch(actionCreators.onDeleteCard(id))
  }
}
export default connect(null, mapDispatchToProps)(Card);