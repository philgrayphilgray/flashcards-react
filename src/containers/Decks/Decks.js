import React, { Component } from 'react';
import { connect } from 'react-redux';

import DeckThumb from '../../components/DeckThumb/DeckThumb';

class Decks extends Component {

  addDeckHandler = () => {
    this.props.onAddDeck(this.props.deckID);
  }

  render() {
    const allDecks = [];
    for (let key in this.props.decks) {
      allDecks.push(this.props.decks[key]);
    }

    const renderedDecks = allDecks.map(deck => (<DeckThumb key={deck.id} id={deck.id} name={deck.deckName} />));

    return (<div>
      {renderedDecks}
      <button onClick={this.addDeckHandler}>add a deck</button>
    </div>)
  }
}

const mapStateToProps = state => {
  return {
    decks: state.decks,
    deckID: state.deckIdCounter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddDeck: deckId => dispatch({ type: 'ADD_DECK', deckId })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Decks);