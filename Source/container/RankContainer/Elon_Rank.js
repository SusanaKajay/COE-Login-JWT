import React, { Component } from 'react';
import {
    AppRegistry,
    FlatList,
    ActivityIndicator,
    Text,
    View,
    Dimensions,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import styles from './AllRank_style';
import { point, top2, top3, top5, crown, reward, Elon } from '../../../img/imgIndext';
import {memberAPI} from '../../themes/variables';

export default class Elon_Rank extends Component {


    constructor() {
        super();
        this.state = {
            ElonMemberSource: [],
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
        fetch(memberAPI.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    ElonMemberSource: ResponseJson.sort((a, b) => b.Member_Total - a.Member_Total) && ResponseJson.filter(index => index.Member_House === "Elon Mask" && index.Member_Status === "Active"),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });
    }

    render() {
        Top1 = this.state.ElonMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(0, 1);;

        Top2 = this.state.ElonMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(1, 2);

        Top3 = this.state.ElonMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(2, 3);

        Top4to10 = this.state.ElonMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(3, 10)

        var TotalHousPoint = 0;
        var count = this.state.ElonMemberSource.length;
        for (var i = 0; i < count; i++) {
            TotalHousPoint = TotalHousPoint + parseInt(this.state.ElonMemberSource[i].Member_Total);
        }

        return (
            <ScrollView style={styles.allPage}>
                <View style={styles.ElonHomeTopView}>
                    <Image
                        source={Elon}
                        style={styles.HomeTopImage}
                    />
                    <Text style={styles.TotalScore}>{TotalHousPoint}</Text>
                    <Text style={styles.scoreText}>Home Score</Text>
                </View>
                <FlatList
                    data={Top1}
                    renderItem={this.renderTop1}
                    keyExtractor={(item, index) => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <FlatList
                    data={Top2}
                    renderItem={this.renderTop2}
                    keyExtractor={(item, index) => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <FlatList
                    data={Top3}
                    renderItem={this.renderTop3}
                    keyExtractor={(item, index) => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <FlatList
                    data={Top4to10}
                    renderItem={this.renderTop4to10}
                    keyExtractor={(item, index) => item.id}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />

            </ScrollView>
        );
    }


    renderTop1 = ({ item }) => {
        return (
            <View style={styles.ListBox}>
                <View style={styles.rewardView}>
                    <Image source={top5} style={styles.rewardView} />
                </View>

                <Image source={{ uri: item.Member_Profile }} style={styles.image} />
                <View style={styles.DetailView} >
                    <Text style={styles.name}>{item.Member_Name} {item.Member_Lastname}</Text>
                    <Text style={styles.textHome}>{item.Member_House}</Text>
                    <View style={styles.pointView}>
                        <Image style={styles.icon} source={point} />
                        <Text style={styles.point}>{item.Member_Total}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderTop2 = ({ item }) => {
        return (
            <View style={styles.ListBox}>
                <View style={styles.rewardView}>
                    <Image source={reward} style={styles.rewardView} />
                </View>

                <Image source={{ uri: item.Member_Profile }} style={styles.image} />
                <View style={styles.DetailView} >
                    <Text style={styles.name}>{item.Member_Name} {item.Member_Lastname}</Text>
                    <Text style={styles.textHome}>{item.Member_House}</Text>
                    <View style={styles.pointView}>
                        <Image style={styles.icon} source={point} />
                        <Text style={styles.point}>{item.Member_Total}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderTop3 = ({ item }) => {
        return (
            <View style={styles.ListBox}>
                <View style={styles.rewardView}>
                    <Image source={reward} style={styles.rewardView} />
                </View>

                <Image source={{ uri: item.Member_Profile }} style={styles.image} />
                <View style={styles.DetailView} >
                    <Text style={styles.name}>{item.Member_Name} {item.Member_Lastname}</Text>
                    <Text style={styles.textHome}>{item.Member_House}</Text>
                    <View style={styles.pointView}>
                        <Image style={styles.icon} source={point} />
                        <Text style={styles.point}>{item.Member_Total}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderTop4to10 = ({ item }) => {
        return (
            <View style={styles.ListBox}>
                <Image source={{ uri: item.Member_Profile }} style={styles.image2} />
                <View style={styles.DetailView} >
                    <Text style={styles.name2}>{item.Member_Name} {item.Member_Lastname}</Text>
                    <Text style={styles.textHome}>{item.Member_House}</Text>
                    <View style={styles.pointView}>
                        <Image style={styles.icon2} source={point} />
                        <Text style={styles.point2}>{item.Member_Total}</Text>
                    </View>
                </View>
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

}

AppRegistry.registerComponent('Elon_Rank', () => Elon_Rank);