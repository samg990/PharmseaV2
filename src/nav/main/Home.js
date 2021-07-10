import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  signOut = async () => {
    try {
      await Auth.signOut()
      console.log('signed out')
      this.props.updateAuth('auth')
    } catch (err) {
      console.log('error signing out...', err)
    }
  }
  render() {
    console.log('props: ', this.props)
    return (
      <View style={styles.container}>
        <Text>Hello from Home</Text>
        <Text onPress={() => this.props.navigation.navigate('Route2')} style={styles.link}>Go to Route 2</Text>
        <Text onPress={this.signOut} style={styles.link}>Sign Out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  link: {
    color: 'blue',
    marginVertical: 5
  }
})

export default Home
