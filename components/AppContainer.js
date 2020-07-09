import React, {Component} from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { Constants } from 'expo'
import {FlashCardWrapper} from './CreateCard/FlashCardWrapper'
import {connect} from 'react-redux'
import {handleGetDecks} from '../redux/actions/decks'

class AppContainer extends Component {

  componentDidMount()
  {
    this.props.dispatch(handleGetDecks());
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View>
          <StatusBar translucent {...this.props}/>
        </View>
        {this.props.initialized &&
          <FlashCardWrapper/>
        }
      </View>
    )
  }
}

function mapStateToProps({initialized,loadingBar})
{
    return {
      initialized
    }
}

export default connect(mapStateToProps)(AppContainer)
