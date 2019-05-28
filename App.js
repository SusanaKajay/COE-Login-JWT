/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
