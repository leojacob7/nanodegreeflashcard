import React, { Component }from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default class DeckItemRenderer extends Component{

  render() {
    const { item, handleDetail, onDelete } = this.props
    const noCards = item.questions.length === 0 ? true : false
    return (
      <View style={styles.container}>
        <Text>{item.title}</Text>

        {noCards === true && (
          <Text>No cards found</Text>
        )}

        {noCards === false && (
          <Text>
            {`Cards in this deck: ${item.questions.length}`}
          </Text>
        )}

        {noCards === false && Number(item.totalCount) === 0 && (
          <Text>
            You havent started this deck yet!
          </Text>
        )}

        {noCards === false && Number(item.totalCount) !== 0 && (
          <Text>
            {`highscoer: ${item.totalscore}`}
          </Text>
        )}

        <TouchableOpacity activeOpacity={0.5} onPress={handleDetail}>
          <View style={[styles.btnstyle]}>
            <Text>Open</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            onDelete();
          }}
        >
          <View style={[styles.btnstyle,]}>
            <Text>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
  }
  
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: 'center',
		padding: 15,
		margin: 10,
		justifyContent: 'center',
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

	highscoer: {
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
});
