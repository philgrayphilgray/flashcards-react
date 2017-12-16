import * as actionTypes from './actionTypes';

export const increaseAttempts = id => {
  return {
    type: actionTypes.INCREASE_ATTEMPTS, id
  }
}

export const increasePeeks = id => {
  return {
    type: actionTypes.INCREASE_PEEKS, id
  }
}

export const onChangeQuestion = (newText, id) => {
  return {
    type: actionTypes.CHANGE_QUESTION, id, newText
  }
}

export const onChangeAnswer = (newText, id) => {
  return {
    type: actionTypes.CHANGE_ANSWER, id, newText
  }
}

export const onDeleteCard = id => {
  return {
    type: actionTypes.DELETE_CARD, id
  }
}

export const addCard = payload => {
  return {
    type: actionTypes.ADD_CARD, payload
  }
}