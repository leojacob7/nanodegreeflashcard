import { AsyncStorage } from 'react-native'
const KEY = 'ReactNativeFlashCards.1.0.0'
export function getDecks(){
  return AsyncStorage.getItem(KEY)
    .then((results)=>{
      return JSON.parse(results);
    })
}

export function saveDeck(title){
  return AsyncStorage.mergeItem(KEY, JSON.stringify({
    [title]:{
      totalscore : 0,
      totalCount : 0,
      title : title,
      questions : []
    }})
  )
  .then((error)=>{
    return AsyncStorage.getItem(KEY)
  })
  .then((results)=>{
    return JSON.parse(results);
  })
}

export function saveScore(deck, score){
  return AsyncStorage.getItem(KEY)
  .then((results)=>{
    const data = JSON.parse(results);
    data[deck]['totalscore'] = score
    data[deck]['totalCount'] = Number(data[deck]['totalCount'])+1
    return AsyncStorage.setItem(KEY, JSON.stringify(data));
  })
  .then(()=>{
    return AsyncStorage.getItem(KEY)
  })
  .then((results)=>{
    return JSON.parse(results);
  })
}

export function removeDeck(title){
  return AsyncStorage.getItem(KEY)
    .then((results)=>{
      const data = JSON.parse(results);
      data[title] = undefined
      delete data[title]
      return AsyncStorage.setItem(KEY, JSON.stringify(data));
    })
    .then(()=>{
      return AsyncStorage.getItem(KEY)
    })
    .then((results)=>{
      return JSON.parse(results);
    })
}

export function addCard(deck,question,answer){
  return AsyncStorage.getItem(KEY)
  .then((results)=>{
    const data = JSON.parse(results);
    data[deck]['questions'].unshift({question,answer})
    return AsyncStorage.setItem(KEY, JSON.stringify(data));
  })
  .then(()=>{
    return AsyncStorage.getItem(KEY)
  })
  .then((results)=>{
    return JSON.parse(results);
  })
}
