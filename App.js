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

//import Test from './Source/container/TestScreen/AllEventScreen'
import Tab from './Source/container/SignInContainer/SignIn';
//import Tab from './Source/TestScreeen/test'
export default class App extends Component {
  render() {
    return (
      <Tab/>
    );
  }
};
