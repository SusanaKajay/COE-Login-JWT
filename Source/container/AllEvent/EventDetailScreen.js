import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    FlatList,
    Image,
    ListView,
} from 'react-native';
import styles from './Style';
import Detail_style from './Detail_style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { pin, point } from '../../../img/imgIndext'
import { EventAPI } from '../../themes/variables';
import { calendar, clock } from '../../../img/imgIndext'
export default class EventDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('Event_Name', 'Event_Name'),
            headerTintColor: 'white',
            headerLayoutPreset: 'center',
            headerStyle: {
                backgroundColor: '#e80083',
            }
        };
    }

    constructor() {
        super();
        this.state = {
            OpenEventSource: [],
            loading: false,
            refreshing: false,
            error: null,
            page: 1,
            seed: 1,
        }
    }

    componentDidMount() {
        this.RemoteRequest();
    }

    RemoteRequest = () => {

        const { navigation } = this.props;
        const EventId = navigation.getParam('Event_id', 'NO-ID');

        fetch(EventAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    OpenEventSource: ResponseJson.filter(index => index._id === EventId),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });
    }

    render() {
        return (
            <View style={styles.allPage}>
                <FlatList
                    data={this.state.OpenEventSource}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.OpenEvent_Name}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    ListFooterComponent={this.renderFooter}
                />

            </View>
        );
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.ListBox}>
                <Image
                    source={{ uri: item.OpenEvent_Picture }}
                    style={styles.image}
                />
                <View style={Detail_style.Detail_View}>

                    <View style={Detail_style.NameView}>
                        <Text style={Detail_style.NameText}>{item.OpenEvent_Name}</Text>
                    </View>

                    <View style={Detail_style.createByView}>
                        <Text style={Detail_style.normalText}>Created By {item.CreatedBy_ID}</Text>
                    </View>

                    <View style={Detail_style.row}>
                        <Image
                            source={point}
                            style={Detail_style.icon}
                        />
                        <Text style={Detail_style.normalText}>{item.OpenEvent_Point}</Text>
                    </View>
                    <View style={Detail_style.DescripView}>
                        <Text style={Detail_style.normalText}> {item.OpenEvent_Descrip}</Text>
                    </View>

                    <View style={Detail_style.eventToPinView}>

                        <View style={Detail_style.row}>
                            <Image
                                source={pin}
                                style={Detail_style.icon}
                            />
                            <Text style={Detail_style.normalText}>{item.OpenEvent_Location}</Text>
                        </View>

                        <View style={styles.DetailViewFrame}>
                            <View style={styles.DetailView}>
                                <Text style={styles.TextDetail}>Start </Text>
                                <View style={styles.DetailView}>
                                    <Image
                                        source={clock}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.TextDetail}>{item.OpenEvent_StartTime}</Text>
                                </View>
                                <View style={styles.DetailView}>
                                    <Image
                                        source={calendar}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.TextDetail}>{item.OpenEvent_StartDate}</Text>
                                </View>
                            </View>

                            <View style={styles.DetailView}>
                                <Text style={styles.TextDetail}>End   </Text>
                                <View style={styles.DetailView}>
                                    <Image
                                        source={clock}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.TextDetail}>{item.OpenEvent_EndTime}</Text>
                                </View>
                                <View style={styles.DetailView}>
                                    <Image
                                        source={calendar}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.TextDetail}>{item.OpenEvent_StartDate}</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                </View >
            </View>
        )
    }

    handleRefresh = () => {
        this.setState = {
            page: 1,
            refreshing: true,
            seed: this.state.seed + 1,
        }, () => {
            this.RemoteRequest();
        }
    }

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: 'gray'
                }}
            >
                <ActivityIndicator animating size='large' />
            </View>
        )
    }
}

AppRegistry.registerComponent('EventDetailScreen', () => EventDetailScreen);