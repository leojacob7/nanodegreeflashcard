export default function decks(state = {}, action){
  switch (action.type)
  {
    case 'FETCH_DECKS' :
    return {
      ...action.decks
    }

    case 'CREATE_NEW_DECK':
    return {
      ...state,
      [action.decktitle]:{
        totalscore : 0,
        totalCount : 0,
        title : action.decktitle,
        questions : []
      }
    }
    default :
      return state
  }
}
