import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message';

import { Auth } from 'aws-amplify'

import { Input, ActionButton } from '../../components'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
      await Auth.signIn(username, password)
      console.log('successfully signed in')
      Toast.show({
        type: 'success',  
        text1: 'Success', 
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
  
});
      
      this.props.updateAuth('MainNav')
    } catch (err) {
      console.log('error signing in...', err)
      Toast.show({
        type: 'error',  
        text1: 'Invalid Login', 
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
  
});
      
    }
  }
  showForgotPassword = () => {
    this.props.toggleAuthType('showForgotPassword')
  }
  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          type='username'
          placeholder='Username'
        />
        <Input
          onChangeText={this.onChangeText}
          type='password'
          placeholder='Password'
          secureTextEntry
        />
        <ActionButton
          title='Sign In'
          onPress={this.signIn}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={this.showForgotPassword}>
            <Text>Forget your password?</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default SignIn