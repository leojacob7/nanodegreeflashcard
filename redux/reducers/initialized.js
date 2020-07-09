export default function initialized(state = null, action){
  switch (action.type)
  {
    case 'INITIALISE_DECKS' :
    return action.init

    default :
      return state
  }
}
