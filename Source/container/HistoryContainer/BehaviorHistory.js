import React, { Component } from 'react';
import {
    AppRegistry,
    FlatList,
    ActivityIndicator,
    Text,
    View,
    Dimensions,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { coin, box, calendar } from '../../../img/imgIndext';
import { BehavHisAPI } from '../../themes/variables';
import styles from './style';


export default class BehavHistory extends Component {

    constructor() {
        super();
        this.state = {
            BehavHistorySource: [],
            loading: false,
        }
    }

    componentDidMount() {
        this.RemoteRequest();
    }

    RemoteRequest = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
        fetch(BehavHisAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    BehavHistorySource: ResponseJson.filter(index => index.Member_ID === id),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false })
            });
    }

    render() {
        return (
            <View style={styles.allPage}>
                <FlatList
                    data={this.state.BehavHistorySource}
                    renderItem={this.JoinCard}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        )
    }

    JoinCard = ({ item }) => {
        return (
            <View style={styles.allPage}>
                <View style={styles.card}>
                    <View style={styles.subCard}>
                        <View style={styles.subCard2}>
                            <Text style={styles.TextName}>{item.Behavior_Name}</Text>
                        </View>

                        <View style={styles.subCard3}>
                            <Text style={styles.TextBehav}>-{item.Behavior_Point} point</Text>
                        </View>
                    </View>
                    <View style={styles.subCard}>
                        <View style={styles.subCard2}>
                            <Text style={styles.normalText}>{item.JoinBehavior_Date} </Text>
                        </View>

                        <View style={styles.subCard3}>
                            <Text style={styles.normalText}>Edit By: {item.JoinBehavior_Admin}</Text>
                        </View>
                    </View>

                </View>

            </View>
        )
    }
}

AppRegistry.registerComponent('BehavHistory', () => BehavHistory);