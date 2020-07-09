import {getDecks,removeDeck,saveDeck, addCard, saveScore} from '../utils/api'

export function fetchDecks(decks){
  return{
    decks,
    type : 'FETCH_DECKS',
  }
}

export function initialisedDeck(){
  return{
    init:true,
    type : 'INITIALISE_DECKS',
  }
}

function createDeckAction (decktitle) {
  return {
    type: 'CREATE_NEW_DECK',
    decktitle,
  }
}

export function handleGetDecks()
{
  return (dispatch) => {
    return getDecks()
    .then((decks) => {
      dispatch(fetchDecks(decks))
      dispatch(initialisedDeck())
    })
  }
}

export function handleCreateDeck(decktitle)
{
  return (dispatch) => {
    dispatch(createDeckAction(decktitle))
    return saveDeck(decktitle)
    .then((decks) => {
      dispatch(fetchDecks(decks))
    })
  }
}

export function removeDeckAction(deckTitle)
{
  return (dispatch) => {
    return removeDeck(deckTitle)
    .then((decks) => {
      dispatch(fetchDecks(decks))
    })
  }
}

export function addCardAction(deck,question,answer)
{
  return (dispatch) => {
    return addCard(deck,question,answer)
    .then((decks) => {
      dispatch(fetchDecks(decks))
    })
  }
}

export function saveScoreAction(deck, userScore)
{

  return (dispatch) => {
    return saveScore(deck,userScore)
    .then((decks) => {
      dispatch(fetchDecks(decks))
    })
  }
  
}

