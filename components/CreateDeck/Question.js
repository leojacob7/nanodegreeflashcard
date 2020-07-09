import React, {Component} from 'react'
import FlipCard from 'react-native-flip-card'
import { saveScoreAction } from '../../redux/actions/decks'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../../redux/utils/notification'
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native'

class Question extends Component{
  state={
    questionpos:0,
    correct:0,
    toculminate:false,
  }

  onsetAnswer = (answer) => {
    const {cards} = this.props

    this.setState(prevState => ({
      correct: answer === true ? prevState.correct + 1 : prevState.correct,
      questionpos: (cards[prevState.questionpos+1]!==undefined) ? prevState.questionpos+1 : prevState.questionpos,
      toculminate:!(cards[prevState.questionpos+1]!==undefined)
    }));
  }

  restart = () => {
    this.setState({
      correct:0,
        questionpos:0,
        toculminate:false,
      });
  }

  saveScore = () => {
    const {entryId, navigation, dispatch} = this.props
    const {correct} = this.state
    clearLocalNotification()
      .then(setLocalNotification)
    dispatch(saveScoreAction(entryId, correct))
    navigation.navigate('Deck',{entryId})
  }

  calculatePercentage = () => {
    const {correct} = this.state;
    const {cards} = this.props;
    var len = cards.length;
    return correct === 0 ? 0 : Math.floor((correct / len)*100)
  }

  render()
  {
    const {cards, entryId} = this.props;
    const {questionpos,correct, toculminate} = this.state
    if(cards !== undefined && cards.length > 0 )
    {
      return(
        <View style={{flex: 1}}>
          {!toculminate &&
            <View style={styles.flipCardContainer}>
              <FlipCard
                style={styles.flipCard}
                friction={10}
                flipHorizontal={false}
                flipVertical={true}>
                  <View style={{flex:1}}>
                    <View style={styles.cardContentTop}>
                      <Text style={styles.cardContentTopText}>
                        Question {questionpos + 1} / {cards.length}
                      </Text>
                    </View>
                    <View style={styles.cardContentCenter}>
                      <Text style={styles.cardContentCenterText}>{cards[questionpos]['question']}</Text>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={[styles.buttonStyle]}>
                          <Text>
                            Show Answer
                          </Text>
                        </View>
                    </View>
                  </View>

                  <View style={{flex:1}}>
                    <View style={styles.cardContentTop}>
                      <Text style={styles.cardContentTopText}>
                        Answer {questionpos + 1} / {cards.length}
                      </Text>
                    </View>
                    <View style={styles.cardContentCenter}>
                      <Text style={styles.cardContentCenterText}>{cards[questionpos]['answer']}</Text>
                    </View>
                    <View style={styles.cardStyle}>
                      <TouchableOpacity
                        activeOpacity = {.5}
                        onPress={() => this.onsetAnswer(true)}>
                        <View style={[styles.buttonStyle]}>
                          <Text>
                            Correct
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity = {.5}
                        onPress={() => this.onsetAnswer(false)}>
                        <View style={[styles.buttonStyle]}>
                          <Text>
                            Failed
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </FlipCard>
              </View>
          }

          {toculminate &&
            <View style={styles.flipCard}>
              <View style={{flex:1}}>
                <View style={styles.cardContentCenter}>
                  <Text style={styles.cardContentCenterText}>
                    {`Score ${this.state.correct} Point`}
                  </Text>
                  <Text style={styles.cardContentCenterText}>
                    {this.calculatePercentage()}
                  </Text>
                </View>
                <View style={styles.cardStyle}>
                  <TouchableOpacity
                    activeOpacity = {.5}
                    onPress={() => this.restart()}>
                    <View style={[styles.buttonStyle]}>
                      <Text>
                        Restart
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity = {.5}
                    onPress={() => this.saveScore()}>
                    <View style={[styles.buttonStyle]}>
                      <Text>
                        Save & go back
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        </View>
      )
      return null
    }
  }
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		margin: 10,
	},

	cardContentTop: {
		justifyContent: 'center',
		flex: 0.3,
	},

	cardContentTopText: {
		fontSize: 15,
		textAlign: 'center',
	},

	cardContentCenter: {
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10,
		flex: 0.4,
	},

	cardStyle: {
		justifyContent: 'center',
		alignItems: 'center',
	},

	flipCardContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'center',
	},

	flipCard: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		margin: 40,
		justifyContent: 'center',
	},

	buttonStyle: {
		margin: 10,
		padding: 41,
		paddingTop: 20,
		paddingBottom: 20,
		borderWidth: 1,
		width: 180,
	},

	cardContentCenterText: {
		textAlign: 'center',
		color: '#000000',
		fontWeight: 'bold',
		fontSize: 20,
	},
});

function mapStateToProps ({decks,loadingBar},{ navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    cards:decks[entryId]['questions']
  }
}

export default connect(mapStateToProps, null)(Question)
