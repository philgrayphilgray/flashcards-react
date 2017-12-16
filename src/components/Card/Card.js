import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
class Card extends Component {
  componentDidMount() {
    this.props.increaseAttempts(this.props.id);
  }

  state = {
    showAnswer: false
  };
  clickHandler = () => {
    if (!this.state.showAnswer) {
      this.props.increasePeeks(this.props.id);
    } else {
      this.props.increaseAttempts(this.props.id);
    }
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  };
  render() {
    let flipcardClasses = ["flipcard"];
    if (this.state.showAnswer) {
      flipcardClasses.push("clicked");
    } else {
      flipcardClasses = ["flipcard"];
    }

    return (
      <div className="card-container">
        <div className={flipcardClasses.join(" ")} onClick={this.clickHandler}>
          <div className="Card side">
            <div>
              <h2>Q</h2>
              <p>{this.props.question}</p>
            </div>
          </div>
          <div className="Card back">
            <div>
              <h2>A</h2>
              <p>{this.props.answer}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseAttempts: id => dispatch(actionCreators.increaseAttempts(id)),
    increasePeeks: id => dispatch(actionCreators.increasePeeks(id))
  };
};

export default connect(null, mapDispatchToProps)(Card);
