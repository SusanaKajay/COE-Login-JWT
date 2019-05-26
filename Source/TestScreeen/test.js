import React from 'react';
import { Picker, Text, View, FlatList } from 'react-native';



export default class Test extends React.Component {

  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this);
    this.state = {
      defaultKey: "somevalue"
    };
  }

  handler(value) {
    this.setState({
      defaultKey: value
    })
  }
  renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    )
  }
  render() {
    return (
      <View>
        <TestComponent handler={this.handler} />
        <FlatList
          data={this.state.defaultKey}
          renderItem={this.renderItem}
        />
        <Text>
          {this.state.defaultKey + ' from defaultKey from main class'}
        </Text>
      </View>
    );
  }
}



let myArr = [
  {
    "key": "key0",
    "value": "value0"
  },
  {
    "key": "key1",
    "value": "value1"
  }
];

let defaultKey = "key0";

class TestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "value0",
      PickerValueHolder: "value0"
    }
  }

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.PickerValueHolder}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ PickerValueHolder: itemValue });
            defaultKey = myArr[itemIndex].key;
            defaultIndex = itemIndex;
            this.props.handler(defaultKey);
          }
          }
        >
          {myArr.map((item, key) => (
            <Picker.Item label={item.key} value={item.value} key={key} />)
          )}
        </Picker>
        <Text>
          {defaultKey + ' from defaultKey from TestComponent'}
        </Text>
      </View>
    );
  }
}