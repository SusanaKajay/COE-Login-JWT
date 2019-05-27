import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
    Alert,
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { coin, box, calendar } from '../../../img/imgIndext';
import { JoinHisAPI } from '../../themes/variables';
import styles from './style';

import AllScreen from '../../screen/TabNavigation';

const ACCESS_TOKEN = 'access_token';

class SignIn extends Component {

    constructor() {
        super()
        this.state = {
            Username: '',
            Password: '',
            error: '',
            timePassed: false,
            Hidebtn: true,
        }
    }

    redirect(routeName, accessToken) {
        this.props.navigator.push({
            name: routeName
        });
    }

    storeToken(responseData) {
        AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err) => {
            if (err) {
                console.log("an error");
                throw err;
            }
            console.log("success");
        }).catch((err) => {
            console.log("error is: " + err);
        });
    }

    async onLoginPressed() {

        this.setState({ showProgress: true })
        try {
            let response = await fetch('http://192.168.1.99:3000/login/member', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: this.state.Username,
                    Password: this.state.Password,
                })
            });

            let res = await response.text();
            if (this.state.Username == "" && this.state.Password == "") {
                Alert.alert('Please fill Username and Password!')
                return 0
            } if (this.state.Username == "" && this.state.Password != "") {
                Alert.alert('Please fill Password!')
                return 0
            } if (this.state.Password == "" && this.state.Username != "") {
                Alert.alert('Please fill Password!')
                return 0
            }

            if (response.status == 200) {
                //Handle success
                let accessToken = res;
                console.log(accessToken);
                //On success we will store the access_token in the AsyncStorage
                this.storeToken(accessToken);
                this.redirect('AllScreen');
            } else {
                //Handle error
                let error = res;
                throw error;
            }

        } catch (error) {
            this.setState({ error: error });
            console.log("error " + error);
            this.setState({ showProgress: false });
        }
    }

    render() {

        return (
            <View style={styles.allPage}>
                <View style={styles.TopView}>
                    <View style={styles.TextView}>
                        <Text style={styles.TopFont}>Welcome to</Text>
                        <Text style={styles.TopFont}>COE</Text>
                        <Text style={styles.TopFont}>Reward</Text>
                    </View>
                </View>
                <View style={styles.BottomView}>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Student ID'
                        keyboardType='number-pad'
                        maxLength={8}
                        onChangeText={(text) => this.setState({ Username: text })}
                    />
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ Password: text })}
                    />


                    <TouchableOpacity
                        onPress={this.onLoginPressed.bind(this)}
                    >
                        <View style={styles.btnView}>
                            <View style={styles.btn}>
                                <Text style={styles.fontBtn}>Sign In</Text>
                            </View>
                        </View>
                    </TouchableOpacity>


                    <Text>
                        {this.state.error}
                    </Text>

                </View>
            </View>
        )
    }

}

const RootStack = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null
        }
    },
    AllScreen: {
        screen: AllScreen,
        navigationOptions: {
            header: null
        }
    },
},
    {
        initialRouteName: 'SignIn',
    })


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

//AppRegistry.registerComponent('SignIn', () => SignIn);