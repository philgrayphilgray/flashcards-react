import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card";

class Deck extends Component {
  state = {
    index: 0,
    cards: []
  };

  componentDidMount() {
    const cardsArray = [];
    for (let card in this.props.cards) {
      cardsArray.push(this.props.cards[card]);
    }
    const newCards = cardsArray
      .filter(card => card.deck === this.props.match.params.id)
      .filter(card => card.attempts <= 3)
      .sort((a, b) => a.attempts - b.attempts);
    const oldCards = cardsArray
      .filter(card => card.deck === this.props.match.params.id)
      .filter(card => card.attempts > 3)
      .sort(
        (a, b) =>
          (a.attempts - a.peeks) / a.attempts -
          (b.attempts - b.peeks) / b.attempts
      );
    this.setState({ cards: [...newCards, ...oldCards] });
  }
  nextButtonHandler = () => {
    const nextIndex =
      this.state.cards.length > this.state.index + 1 ? this.state.index + 1 : 0;
    this.setState({
      index: nextIndex
    });
  };

  previousButtonHandler = () => {
    const prevIndex =
      this.state.index > 0 ? this.state.index - 1 : this.state.cards.length - 1;
    this.setState({
      index: prevIndex
    });
  };

  render() {
    const cards = this.state.cards.map(card => {
      return (
        <Card
          question={card.question}
          answer={card.answer}
          id={card.id}
          key={card.id}
          attempts={card.attempts}
          peeks={card.peeks}
        />
      );
    });
    const addCardsMessage =
      this.state.cards.length === 0 ? (
        <p>
          <Link to={{ pathname: "/editor/" + this.props.match.params.id }}>
            Add some cards >>
          </Link>
        </p>
      ) : (
        <p>
          <Link to={{ pathname: "/editor/" + this.props.match.params.id }}>
            Editor >>
          </Link>
        </p>
      );

    return (
      <div>
        {addCardsMessage}
        <h2>Deck</h2>
        {this.state.cards.length ? (
          <p>
            {this.state.index + 1} / {this.state.cards.length}
          </p>
        ) : null}
        {cards[this.state.index]}
        <div className="button-group">
          <button
            onClick={this.nextButtonHandler}
            disabled={this.state.cards.length < 2}
          >
            Next
          </button>
          <button
            onClick={this.previousButtonHandler}
            disabled={this.state.cards.length < 2}
          >
            Previous
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

export default connect(mapStateToProps)(Deck);
