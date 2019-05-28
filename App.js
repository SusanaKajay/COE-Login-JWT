/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 /*
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

//import Tab from './Source/screen/TabNavigation';

import SignIn from './Source/container/SignInContainer/SignIn'

export default class App extends Component {
  render() {
    return (
      <SignIn/>
    );
  }
};
*/

import React, {Component} from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation'; 
import SignInScreen from './Source/container/SignInContainer/SignIn';
import HomeScreen from './Source/screen/TabNavigation';

const RootStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      header : null
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header : null
    }
  }
},{
  initialRouteName: 'SignIn'
})

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return( 
        <AppContainer/>
        )
    }
}
