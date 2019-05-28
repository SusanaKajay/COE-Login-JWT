import React, { Component } from 'react';
import {
    FlatList,
    ActivityIndicator,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    AsyncStorage,
} from 'react-native';
import styles from './Style';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { memberAPI, HomeColor, JoinHisAPI, BehavHisAPI, RedeemHisAPI, } from '../../themes/variables';
import { point, coin } from '../../../img/imgIndext'
const { height, width } = Dimensions.get('window');

import BehavHistory from '../HistoryContainer/BehaviorHistory';
import JoinEventHistory from '../HistoryContainer/JoinEventHistory';
import RedeemHistory from '../HistoryContainer/RedeemHistory';
import EdtiPassword from '../EditPasswordContainer/EditPassword';
import EditPrifileImage from '../EditProfileImageContainer/EditProfileImage';
import EditPhoneNumber from '../EditPhoneNumberContainer/EditPhoneNumber';
//import SignIn from '../SignInContainer/SignIn2';

import userState from '../../store/UserState';
const ACCESS_TOKEN = userState.getTokenFromLogin
class Profile extends Component {

    static navigationOption = {
        title: "Profile",
    }

    constructor() {
        super()
        this.state = {
            MemberSource: [],
            JoinHis: [],
            BehavHis: [],
            RedeemHis: [],
            loading: false,
        }
    }

    async deleteToken(){
        try{
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            userState.setTokenFromLogin("");
            Alert.alert('Delete Token')
        }catch(error){
            Alert.alert("Somethig went Wrong")
        }
    }

    componentDidMount() {
        this.RemoteRequest();
        // alert('userState is '+ userState.getid)
    }

    RemoteRequest = () => {

        //const getVariableFromLogin = '58113242'
        const getVariableFromLogin = userState.getid
        fetch(memberAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    MemberSource: ResponseJson.filter(index => index.Member_ID === getVariableFromLogin),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });

        fetch(JoinHisAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    JoinHis: ResponseJson.filter(index => index.Member_ID === getVariableFromLogin),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });

        fetch(BehavHisAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    BehavHis: ResponseJson.filter(index => index.Member_ID === getVariableFromLogin),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });

        fetch(RedeemHisAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    RedeemHis: ResponseJson.filter(index => index.Member_ID.toString() === getVariableFromLogin),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });

    }

    onLogout(){
        this.setState({showProgress: true})
        this.deleteToken();
    }

    render() {
        let JoinHisLength = this.state.JoinHis.length
        let BehavHisLength = this.state.BehavHis.length
        let RedeemHisLength = this.state.RedeemHis.length
        return (
            <ScrollView style={styles.allPage}>
                <FlatList
                    data={this.state.MemberSource}
                    renderItem={this.renderMemberCard}
                    keyExtractor={(item, index) => item.id}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('JoinEventHistory', { id: this.state.MemberSource[0].Member_ID })}
                >
                    <View style={styles.btn}>
                        <View style={styles.subBtn}>
                            <Text style={styles.btnText}>Join Event History</Text>
                        </View>
                        <View style={styles.subBtn1}>
                            <Text style={styles.btnText}>{JoinHisLength}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('BehavHistory', { id: this.state.MemberSource[0].Member_ID })}
                >
                    <View style={styles.btn}>
                        <View style={styles.subBtn}>
                            <Text style={styles.btnText}>Behavior History</Text>
                        </View>
                        <View style={styles.subBtn1}>
                            <Text style={styles.btnText}>{BehavHisLength}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('RedeemHistory', { id: this.state.MemberSource[0].Member_ID })}
                >
                    <View style={styles.btn}>
                        <View style={styles.subBtn}>
                            <Text style={styles.btnText}>Redeem History</Text>
                        </View>
                        <View style={styles.subBtn1}>
                            <Text style={styles.btnText}>{RedeemHisLength}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('EditPrifileImage', { id: this.state.MemberSource[0].Member_ID })}
                >
                    <View style={styles.btn2}>
                        <Text style={styles.btnText}>Change Profile Image</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('EditPhoneNumber', { id: this.state.MemberSource[0].Member_ID })}
                >
                    <View style={styles.btn2}>
                        <Text style={styles.btnText}>Change Phone Number</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('EdtiPassword', { id: this.state.MemberSource[0].Member_ID })}
                >
                    <View style={styles.btn2}>
                        <Text style={styles.btnText}>Reset Password</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.onLogout.bind(this)}
                >
                    <View style={styles.btn2}>
                        <Text style={styles.btnText}>Sign Out</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        )
    }

    renderMemberCard = ({ item }) => {

        var homeCol = '';
        if (item.Member_House == "Bill Gates") {
            homeCol = HomeColor.Bill;
        } else if (item.Member_House == "Elon Musk") {
            homeCol = HomeColor.Elon;
        } else if (item.Member_House == "Larry Page") {
            homeCol = HomeColor.Larry;
        } else if (item.Member_House == "Mark Zuckerberg") {
            homeCol = HomeColor.Mark;
        }

        return (

            <View style={styles.allPage}>
                <View style={{
                    backgroundColor: homeCol,
                    width: width,
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                }}>
                    <View style={styles.subMemberCard}>
                        <Image
                            source={{ uri: item.Member_Profile }}
                            style={styles.memberImg}
                        />
                    </View>
                    <View style={styles.subMemberCard}>
                        <View style={styles.memberContentView}>
                            <Text style={styles.memberText1} >{item.Member_Name}</Text>
                            <Text style={styles.memberText1}>{item.Member_Lastname}</Text>
                            <Text style={styles.memberText2}>ID: {item.Member_ID}</Text>
                            <Text style={styles.memberText2}>Tel: {item.Member_Tel}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.MyPointFrame}>
                    <View style={styles.MyPointView}>
                        <View style={styles.MyPointBorderFrame}>
                            <Text style={styles.MyPointText2}>My Point</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={point}
                                    style={styles.icon}
                                />
                                <Text style={styles.MyPointText}>{item.Member_Total}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.MyPointView}>
                        <View style={styles.MyWalletBorderFrame}>
                            <Text style={styles.MyWalletText2}>My Wallet</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    source={coin}
                                    style={styles.icon1}
                                />
                                <Text style={styles.MyWalletText}>{item.Member_Available}</Text>
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        )
    }



}


const RootStack = createStackNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        BehavHistory: {
            screen: BehavHistory,
            navigationOptions: {
                title: 'Behavior History',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        JoinEventHistory: {
            screen: JoinEventHistory,
            navigationOptions: {
                title: 'Join Event History',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        RedeemHistory: {
            screen: RedeemHistory,
            navigationOptions: {
                title: 'Redeem History',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        EdtiPassword: {
            screen: EdtiPassword,
            navigationOptions: {
                title: 'Change Password',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        EditPrifileImage: {
            screen: EditPrifileImage,
            navigationOptions: {
                title: 'Change Profile Image',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        EditPhoneNumber: {
            screen: EditPhoneNumber,
            navigationOptions: {
                title: 'Change Phone Number',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
      /*  SignIn:{
            screen: SignIn,
            navigationOptions: {
                header: null
            }
        }*/
    },
    {
        initialRouteName: 'Profile',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}