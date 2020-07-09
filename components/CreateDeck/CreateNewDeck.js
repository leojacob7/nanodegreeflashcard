import React, {Component} from 'react'
import {Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { handleCreateDeck } from '../../redux/actions/decks'

class CreateNewDeck extends Component{
  state={
    input : "",
    result : "",
    disabled:true,
  }

  onHandleChange = (input)=>{
    const {deckTitles} = this.props;

    if(input !== '' && deckTitles.indexOf(input) > -1)
    {
      this.setState(()=>({
        result : 'Sorry a simillar title exists Please enter a new title',
        disabled:true,
        input,
      }))
      return
    }

    if(input === ""){
      this.setState(()=>({
        result : 'Please add valid title for the deck',
        input,
        disabled:true,
      }))
      return
    }

    this.setState(()=>({
      input,
      result : '',
      disabled : false
    }))
  }

  createNewDeck = () =>{
    const deckTitle = this.state.input;
    const {dispatch, navigation} = this.props;
    this.setState(()=>({
      input : '',
      result : '',
      disabled : true
    }))
    dispatch(handleCreateDeck(deckTitle));
    navigation.navigate('Deck',{entryId:deckTitle})
  }

  render(){
    const {disabled} = this.props;
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <Text style={styles.title}>
          Create a new Deck
        </Text>
        <TextInput
          style={styles.deckInput}
          value={this.state.input}
          onChangeText={this.onHandleChange}
        />
      <Text>
        {this.state.result}
      </Text>
      <TouchableOpacity
        onPress={this.createNewDeck}
        disabled={disabled}>
        <View style={this.state.disabled ? styles.disabledBtn : styles.enabledBtn}>
          <Text>
            Create a new Deck
          </Text>
        </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize:30,
    paddingTop:10,
    paddingBottom:10
  },

  wrapper:{
    flex:1,
    alignItems:'center',
    padding: 55,
    marginTop: 17,
    marginLeft: 10,
    marginRight: 17,
   },

   deckInput:{
     width: 150,
     borderWidth: 2,
     margin:15,
     height: 34,
   },

   disabledBtn:{
     padding : 50,
     paddingBottom : 18,
     margin:10,
     borderWidth: 2,
     paddingTop : 16,
     opacity:.5,
   },

   enabledBtn:{
     margin:10,
     padding : 30,
     borderWidth: 1,
     opacity:1,
   },
})

function mapStateToProps({decks})
{
    return {
      deckTitles: Object.keys(decks)
    }
}

export default connect(mapStateToProps, null)(CreateNewDeck)
