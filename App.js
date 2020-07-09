import React, {Component} from 'react';
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import store from './redux/store'
import AppContainer from './components/AppContainer'
import {setLocalNotification} from './redux/utils/notification'

class App extends Component {
  componentDidMount()
  {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App
