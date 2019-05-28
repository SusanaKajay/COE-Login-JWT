import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from './style';
import {ChangeProfile} from '../../themes/variables'

export default class EditPrifileImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Member_Profile: "",
      Member_ID: "",
      error: ""
    };
  }


  handleChoosePhoto = () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.setState({
      Member_ID: id
    })

    
    const options = {
 
    };
  
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({
          Member_Profile:  "data:image/jpeg;base64,"+response.data
        })
      }
    });


  }

  async OnUplode() {
    try {
      let response = await fetch(ChangeProfile.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Member_ID: this.state.Member_ID,
          Member_Profile: this.state.Member_Profile,
        })
      });
      let res = await response.text();
      if (response.status == 200) {
        Alert.alert('Saved!');
        return response.status;
      }
    } catch (error) {
      this.setState({ error: error });
      console.log("error " + error);
    }
  }

  render() {
    return (
      <View style={styles.allPage}>

        {
          this.state.Member_Profile !== "" && <Image
            source={{ uri: this.state.Member_Profile }}
            style={styles.img}
          />
        }


        <TouchableOpacity
          onPress={this.handleChoosePhoto}
          style={styles.btn1}
        >
          <Text style={styles.text}>Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.OnUplode.bind(this)}
          style={styles.btn2}
        >
          <Text style={styles.text}>Upload</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

AppRegistry.registerComponent('EditPrifileImage', () => EditPrifileImage);
