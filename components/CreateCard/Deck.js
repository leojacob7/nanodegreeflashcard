import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Animated, View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'

class Deck extends Component{
  constructor() {
    super()
    this.opacity = new Animated.Value(0)
}

componentDidMount() {
  Animated.timing(this.opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
  }).start();
}

  render(){
    const { item, handleDetail, onDelete } = this.props;
    const animatedStyle = { opacity: this.opacity }
    const {entryId, deck: { title, totalscore, questions }, navigation: { navigate }} = this.props
    return(
      <Animated.View style={styles.wrapper}>
        <Text>
          {`Deck: ${ title }`}
        </Text>
        <Text>
          {`Cards in this deck: ${questions.length} `}
        </Text>
        <Text>
          {`Score: ${totalscore}`}
        </Text>

        <TouchableOpacity
          onPress={()=>navigate(
            'AddCard',
            {entryId : entryId}
          )}>
          <View style={[styles.flashcardbutton]}>
            <Text>
              Create more questions
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled = {questions.length < 1 }
          onPress={()=>this.props.navigation.navigate(
            'Quiz', {entryId : entryId })}>
          { questions.length >= 1 && <View style={[questions.length < 1 ? styles.disabled : styles.enabled, styles.flashcardbutton]}>
            <Text>
              Start Quiz
            </Text>
          </View> }
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    alignItems:'center',
    paddingTop: 20,
  },

  flashcardbutton:{
    alignItems: 'center',
    paddingTop : 15,
    marginTop: 15,
    width : 250,
    padding : 20,
    borderWidth: 4
  },

  disabled:{
    opacity:.1
  },

  enabled:{
    opacity:1
  },
  container: {
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		flex: 1,
		alignItems: 'center',
		padding: 15,
		margin: 10,
		justifyContent: 'center',
		shadowRadius: 2,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
	},

	title: {
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 20,
	},

	cards: {
		fontSize: 14,
		paddingBottom: 0,
	},

	highscore: {
		fontSize: 14,
		paddingTop: 10,
		paddingBottom: 20,
	},

	btnstyle: {
		margin: 10,
		padding: 35,
		borderWidth: 2,
		width: 250,
	},
})

function mapStateToProps ({decks,loadingBar},{ navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    deck:decks[entryId]
  }
}

export default connect(mapStateToProps)(Deck);
