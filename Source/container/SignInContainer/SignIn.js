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
import userState from '../../store/UserState';

class SignIn extends Component {

    constructor() {
        super()
        this.state = {
            Username: '',
            Password: '',
            error: '',
        }
    }

    async storeToken (accessToken){
        try{
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        }catch (error){
            Alert.alert('something went wrong')
        }
    }

    async getToken (){
        try{
            let token = await AsyncStorage.setItem(ACCESS_TOKEN);
            Alert.alert('token:' + token )
        }catch (error){
            Alert.alert('something went wrong')
        }
    }

    async removeToken (){
        try{
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            this.getToken();
        }catch (error){
            Alert.alert('something went wrong')
        }
    }

    async onLoginPressed() {

        this.setState({ showProgress: true })
        try {
            let response = await fetch('http://localhost:3000/login/member', {
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
            let res = await response.json();
            if (response.status == 200) {
                //Handle success
                //Alert.alert('llllllllllll');
                let accessToken = res.token
                //Alert.alert(response.token);
                //Alert.alert(accessToken)
                //On success we will store the access_token in the AsyncStorage
                this.storeToken(accessToken);
                userState.setid(this.state.Username)
                this.props.navigation.navigate('AllScreen');
            } else if(response.status == 401) {
                //Handle error
                let error = res;
                Alert.alert('Wrong Password');
                //throw error;
            }else if(response.status == 402) {
                //Handle error
                let error = res;
                Alert.alert('No datas');
                //throw error;
            }
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
            if(response.status == 401){
                Alert.alert('Wrong Password!')
            }
        } catch (error) {
            this.removeToken();
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