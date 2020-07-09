import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from "react-native";
import { connect } from 'react-redux'
import { removeDeckAction } from '../../redux/actions/decks'
import DeckItemRenderer from './DeckItemRenderer'

class Decks extends Component{

  render() {
    const {decks,dispatch,hasDecks} = this.props;
      return (
        <View style={{flex:1}}>
          {hasDecks === true &&
          <FlatList
            data={Object.values(decks)}
            renderItem={({item}) => (
                <DeckItemRenderer
                  item = {item}
                  handleDetail={()=>this.props.navigation.navigate(
                    'Deck',
                    {entryId : item.title}
                  )}
                  onDelete={()=>{
                    Alert.alert(
                      'Delete Deck',
                      `Do you really want to delete the deck "${item.title}" including all of it's cards ?`,
                      [
                        {text: 'No',style: 'cancel'},
                        {text: 'Yes', onPress: () => dispatch(removeDeckAction(item.title))},
                      ],
                      {cancelable: false},
                    );
                  }}
                />
            )}
            keyExtractor={(item, index) => item.title}
          />}
          { !hasDecks &&
            <View style={styles.messageContainer}>
              <Text style={styles.messageContext}>
                Please create a new deck to continue
              </Text>
            </View>
          }
        </View>
      )
    }
}

const styles = StyleSheet.create({
  messageContainer:{
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 180,
  },
  messageHeader:{
    fontSize:20,
    paddingTop:10,
    paddingBottom:20,
    textAlign:'center'
  },

  messageContext:{
    margin: 50,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:14,
    paddingBottom:0,
    textAlign:'center'
  }
})

function mapStateToProps({decks,initialized,loadingBar})
{
    return {
      decks,
      initialized,
      hasDecks:Object.keys(decks).length > 0 ? true : false
    }
}

export default connect(mapStateToProps)(Decks)
