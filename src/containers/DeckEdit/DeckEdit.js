import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../../store/actions/actions";

import CardEdit from "../../components/CardEdit/CardEdit";
class DeckEditor extends Component {
  state = {
    question: "",
    answer: ""
  };

  componentDidMount() {
    this.focusTextInput();
  }
  onAddCardHandler = () => {
    const formValues = {
      question: this.state.question,
      answer: this.state.answer,
      deck: this.props.match.params.id
    };
    this.props.addCard({ ...formValues });
    this.setState({ question: "", answer: "" });
    this.focusTextInput();
  };

  questionChangeHandler = e => {
    this.setState({ question: e.target.value });
  };

  answerChangeHandler = e => {
    this.setState({ answer: e.target.value });
  };

  handleKeyPress = event => {
    if (event.key === "Enter" && this.state.question && this.state.answer) {
      this.onAddCardHandler();
    }
  };

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    const cardsArray = [];
    for (let card in this.props.cards) {
      cardsArray.push(this.props.cards[card]);
    }
    const cards = cardsArray
      .filter(card => card.deck === this.props.match.params.id)
      .map(card => {
        return (
          <CardEdit
            question={card.question}
            answer={card.answer}
            id={card.id}
            key={card.id}
            attempts={card.attempts}
            peeks={card.peeks}
          />
        );
      });
    return (
      <div>
        <p>
          <Link to="/">&lt;&lt; Back to decks</Link>
        </p>
        <p>
          <Link to={{ pathname: "/player/" + this.props.match.params.id }}>
            Player >>
          </Link>
        </p>
        <h2>Deck Editor</h2>
        {cards}
        <div onKeyPress={this.handleKeyPress}>
          <input
            type="text"
            style={{ width: "100%" }}
            placeholder="Question"
            value={this.state.question}
            onChange={this.questionChangeHandler}
            ref={input => {
              this.textInput = input;
            }}
          />
          <input
            type="text"
            style={{ width: "100%" }}
            placeholder="Answer"
            value={this.state.answer}
            onChange={this.answerChangeHandler}
          />
          <button
            onClick={this.onAddCardHandler}
            disabled={!this.state.question || !this.state.answer}
          >
            Add Card
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cards: state.cards
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCard: payload => {
      dispatch(actionCreators.addCard(payload));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditor);
