import React, { Component } from 'react';
import {
    View, 
    Text,
    AppRegistry,
} from 'react-native';

export default class EditPrifileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> EditPrifileImage </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('EditPrifileImage', () => EditPrifileImage);