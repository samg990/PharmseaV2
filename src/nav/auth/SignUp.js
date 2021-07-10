import React, { Fragment, Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Toast from 'react-native-toast-message';

import { Input, ActionButton } from '../../components'
import { Auth } from 'aws-amplify'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
    stage: 0
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signUp = async () => {
    const {
      username, password, email
    } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email }})
      console.log('successful sign up..')
      Toast.show({
        type: 'success',  
        text1: 'Success', 
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
  
});
      this.setState({ stage: 1 })
    } catch (err) {
      console.log('error signing up...', err)
      if(err.message === 'User already exists'){
        Toast.show({
        type: 'error',  
        text1: 'User Already Exists', 
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,  
        });
      }else if (err.code == "InvalidPasswordException"){
        Toast.show({
        type: 'error',  
        text1: 'Invalid Password',
        text2: 'Password not long enough',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,  
        });
      }
    }
  }
  confirmSignUp = async () => {
    const { username, authCode } = this.state
    try {
      await Auth.confirmSignUp(username, authCode)
      this.props.toggleAuthType('showSignIn')
      Toast.show({
        type: 'success',  
        text1: 'Success', 
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,  
        });
      
    } catch (err) {
      console.log('error signing up...', err)
      if(err.code === 'CodeMismatchException'){
        Toast.show({
        type: 'error',  
        text1: 'Invalid Code', 
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,  
        });
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.stage === Number(0) && (
            <Fragment>
              <Input
                placeholder='Username'
                type='username'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='Password'
                type='password'
                onChangeText={this.onChangeText}
                secureTextEntry
              />
              <Input
                placeholder='Email'
                type='email'
                onChangeText={this.onChangeText}
              />
              {/* 
              If you would like to enable phone number as an attribute, uncomment this field
              <Input
                placeholder='Phone Number'
                type='phone_number'
                onChangeText={this.onChangeText}
              /> */}
              <ActionButton
                title='Sign Up'
                onPress={this.signUp}
              />
            </Fragment>
          )
        }
        {
          this.state.stage === Number(1) && (
            <Fragment>
              <Input
                placeholder='Confirmation Code'
                type='authCode'
                onChangeText={this.onChangeText}
              />
              <ActionButton
                title='Confirm Sign Up'
                onPress={this.confirmSignUp}
                
              />
            </Fragment>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45
  }
})

export default SignIn