import * as actionTypes from "./actions/actionTypes";

const initState = {
  decks: {},
  cards: {},
  cardIdCounter: 0,
  deckIdCounter: 0
};

const reducer = (state = initState, action) => {
  const newCards = { ...state.cards };
  const newDecks = { ...state.decks };
  switch (action.type) {
    case "ADD_DECK":
      newDecks[state.deckIdCounter] = {
        deckName: "deck-" + state.deckIdCounter,
        id: state.deckIdCounter
      };
      const newAddDeckState = {
        ...state,
        decks: { ...newDecks },
        deckIdCounter: action.deckId + 1
      };
      return newAddDeckState;
    case actionTypes.CHANGE_QUESTION:
      newCards[action.id].question = action.newText;
      const newChangeQuestionState = {
        ...state,
        cards: {
          ...newCards
        }
      };
      return newChangeQuestionState;
    case actionTypes.CHANGE_ANSWER:
      newCards[action.id].answer = action.newText;
      const newChangeAnswerState = {
        ...state,
        cards: {
          ...newCards
        }
      };
      return newChangeAnswerState;
    case actionTypes.ADD_CARD:
      newCards[state.cardIdCounter + 1] = {
        question: action.payload.question,
        answer: action.payload.answer,
        id: state.cardIdCounter + 1,
        attempts: 1,
        peeks: 0,
        deck: action.payload.deck
      };
      return {
        ...state,
        cardIdCounter: state.cardIdCounter + 1,
        cards: {
          ...newCards
        }
      };
    case actionTypes.DELETE_CARD:
      delete newCards[action.id];
      return {
        ...state,
        cards: {
          ...newCards
        }
      };
    case actionTypes.INCREASE_ATTEMPTS:
      newCards[action.id].attempts++;
      return {
        ...state,
        cards: {
          ...newCards
        }
      };
    case actionTypes.INCREASE_PEEKS:
      newCards[action.id].peeks++;
      return {
        ...state,
        cards: {
          ...newCards
        }
      };
  }
  return state;
};

export default reducer;
