import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation'
import AddCard from './AddNewCard'
import AddDeck from '../CreateDeck/CreateNewDeck'
import Deck from './Deck'
import Decks from '../CreateDeck/Decks'
import Quiz from '../CreateDeck/Question'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

export function FlashCardWrapper(){

  const TabNavigator = createBottomTabNavigator({
    Decks: {
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: <Ionicons name='ios-bookmarks' size={30}/>
      },
      screen: Decks,
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Create a new deck',
        tabBarIcon: () => <FontAwesome name='plus-square' size={30}/>
      }
    }
  })

  const StackNavigator = createStackNavigator({
    Home:{
      screen: TabNavigator,
    },
    Deck:{
      screen : Deck,
    },
    AddCard:{
      screen : AddCard,
    },
    Quiz:{
      screen : Quiz,
    }
  })

  const AppContainer = createAppContainer(StackNavigator);
  return (
    <AppContainer/>
  );
}
