import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'

import Auth from './nav/auth/Auth'
import Initializing from './nav/Initializing'
import MainNav from './nav/main/MainNav'
import Toast, { BaseToast } from 'react-native-toast-message';


import { Auth as AmplifyAuth } from 'aws-amplify'


const toastConfig = {
  success: ({ text1, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: '#008c33', backgroundColor: '#008c33', }}
      contentContainerStyle={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}
      text1Style={{
        fontSize: 25,
        fontWeight: 'semibold',
        color: 'white'        
      }}
      text1={text1}
      
      
    />
  ),
  error: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: '#8c0000', backgroundColor: '#8c0000', }}
      contentContainerStyle={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}
      text1Style={{
        fontSize: 25,
        fontWeight: 'semibold',
        color: 'white'        
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: 'semibold',
        color: 'white'        
      }}
      text1={text1}
      text2={text2}
      
    />
  )
};

class App extends React.Component {

  


  state = {
    currentView: 'initializing'
  }
  componentDidMount() {
    this.checkAuth()
  }
  updateAuth = (currentView) => {
    this.setState({ currentView })
  }
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
      console.log('user is signed in')
      this.setState({ currentView: 'mainNav' })
    } catch (err) {
      console.log('user is not signed in')
      this.setState({ currentView: 'auth' })
    }
  }
  render() {
    const { currentView } = this.state
    console.log('currentView: ', currentView)
    return (
      <>
        { currentView === 'initializing' && <Initializing />}
        { currentView === 'auth' && <Auth updateAuth={this.updateAuth} />}
        { currentView === 'mainNav' && <MainNav updateAuth={this.updateAuth} />}

        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </>
    )
  }
}

export default App
