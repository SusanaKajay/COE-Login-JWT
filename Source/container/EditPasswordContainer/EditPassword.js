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


export default class EditPassword extends Component {

    constructor() {
        super();
        this.state = {
            Member_Password: "",
            Member_ID: "",
            checkPass1: "",
            checkPass2: "",
            error: "",
        }
    }

    async onPressResetPassword() {
        try {
            const { navigation } = this.props;
            const id = navigation.getParam('id', 'NO-ID');
            if (this.state.checkPass1.length < 8 && this.state.checkPass2.length < 8) {
                Alert.alert('Password must have at least 8 characters')
            } else if (this.state.checkPass1 == this.state.checkPass2) {
                this.setState({
                    Member_Password: this.state.checkPass1,
                    Member_ID: id,
                })
            } else if (this.state.checkPass1 != this.state.checkPass2) {
                Alert.alert('Both passwords are not matching')
            }

            let response = await fetch('http://192.168.43.159:3000/MemberChangePassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Member_ID: this.state.Member_ID,
                    Member_Password: this.state.Member_Password,
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
                    placeholder='New password'
                    keyboardType='default'
                    minLength={5}
                    onChangeText={(text) => this.setState({ checkPass1: text })}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder='Confirm password'
                    keyboardType='default'
                    minLength={5}
                    onChangeText={(text) => this.setState({ checkPass2: text })}
                    secureTextEntry={true}
                />

                <Text>Password must have at least 5 characters</Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.onPressResetPassword.bind(this)}
                >
                    <Text style={styles.saveText}>
                        Save
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}


