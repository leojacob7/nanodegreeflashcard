import React, {Component} from 'react'
import {Text, TextInput, View, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { addCardAction } from '../../redux/actions/decks'
import { NavigationActions } from 'react-navigation'

class AddNewCard extends Component{
  state={
    deckQuestion : '',
    userAnswer : ''
  }

  handleChangeQuestion = (input)=>{
      this.setState(()=>({
        deckQuestion:input,
      }))
  }

  handleChangeAnswer = (input)=>{
      this.setState(()=>({
        userAnswer:input,
      }))
  }

  submitNewCard = () =>{
    const {deckQuestion, userAnswer} = this.state;
    const {dispatch } = this.props;
    this.setState(()=>({
      userAnswer : '',
      deckQuestion : '',
    }))
    dispatch(addCardAction(this.props.entryId,deckQuestion,userAnswer));
    return this.props.navigation.dispatch(
      NavigationActions.back()
    )
  }

  render(){
    const { deck } = this.props;
    console.log('deck', deck)
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>
           {`Add new Card to Deck "${deck.title}"`}
        </Text>
        <Text> Add questions</Text>
        <TextInput
          placeholder={'add question'}
          value={this.state.deckQuestion}
          style={styles.questionInput}
          onChangeText={this.handleChangeQuestion}
        />
        <TextInput
          placeholder={'Add an Answer'}
          value={this.state.userAnswer}
          style={styles.questionInput}
          onChangeText={this.handleChangeAnswer}
        />
      <TouchableOpacity
      disabled={this.state.deckQuestion === '' || this.state.userAnswer === ''}
        onPress={this.submitNewCard}>
        <View style={(this.state.deckQuestion === '' || this.state.userAnswer === '')
          ? styles.disabledBtn
          : styles.enabledBtn}>
          <Text>
            Add a card
          </Text>
        </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    textAlign:'center',
    fontSize:20,
    paddingTop:10,
    paddingBottom:20
  },

  container:{
    flex:1,
    alignItems:'center',
    margin: 10,
    padding: 25,
    marginTop: 17,
   },

   questionInput:{
     height: 50,
     width: 250,
     borderWidth: 1,
     margin:10,
   },

   disabledBtn:{
     margin:10,
     padding : 60,
     paddingTop : 20,
     paddingBottom : 20,
     borderWidth: 2,
     opacity:.3,
     borderRadius: Platform.OS === 'ios' ? 10 : 2
   },

   enabledBtn:{
     margin:10,
     padding : 60,
     paddingTop : 20,
     paddingBottom : 20,
     borderWidth: 2,
     opacity:1,
     borderRadius: Platform.OS === 'ios' ? 10 : 2
   },
})

function mapStateToProps ({decks},{ navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    deck:decks[entryId]
  }
}

export default connect(mapStateToProps)(AddNewCard)
