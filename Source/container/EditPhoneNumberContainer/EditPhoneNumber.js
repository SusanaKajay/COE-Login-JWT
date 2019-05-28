import React, { Component } from 'react'
import {
    Text,
    View,
    AppRegistry,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native'
import styles from './style';
import {Changetel} from '../../themes/variables'

export default class EditPhoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Member_Tel: "",
            Member_ID: "",
            error: "",
        };
    }

    async onPressSave() {
        try {
            const { navigation } = this.props;
            const id = navigation.getParam('id', 'NO-ID');
            if(this.state.Member_Tel != ""){
                this.setState({
                    Member_ID: id
                })
            }
            let response = await fetch(Changetel.url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Member_ID: this.state.Member_ID,
                    Member_Tel: this.state.Member_Tel,
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
                <TextInput
                    style={styles.inputBox}
                    placeholder='New Phone Number'
                    keyboardType='phone-pad'
                    maxLength={10}
                    onChangeText={(text) => this.setState({ Member_Tel: text })}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.onPressSave.bind(this)}
                >
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
