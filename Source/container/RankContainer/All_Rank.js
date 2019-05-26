import React, { Component } from 'react';
import {
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
import styles from './AllRank_style'
import { Bill, Elon, Larry, Mark } from '../../../img/imgIndext'
import { point, top2, top3, top5, crown } from '../../../img/imgIndext';
import { memberAPI, HomeColor, HouseApi } from '../../themes/variables';
const { height, width } = Dimensions.get('window');
import Bill_Rank_Screen from './Bill_Rank';
import Elon_Rank_Screen from './Elon_Rank';
import Larry_Rank_Screen from './Larry_Rank';
import MarkRank_Screen from './Mark_Rank';

class BillScreen extends Component {
    render() {
        return (
            <Bill_Rank_Screen />
        );
    }
}

class ElonScreen extends Component {
    render() {
        return (
            <Elon_Rank_Screen />
        );
    }
}

class LarryScreen extends Component {
    render() {
        return (
            <Larry_Rank_Screen />
        );
    }
}

class MarkScreen extends Component {
    render() {
        return (
            <MarkRank_Screen />
        );
    }
}

class All_Rank extends Component {

    constructor() {
        super();
        this.state = {
            AllMemberSource: [],
            HouseSource: [],
            loading: false,
            refreshing: false,
            error: null,
            page: 1,
            seed: 1,
            show: false,
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
                    AllMemberSource: ResponseJson.filter(index =>
                        index.Member_Status === "Active"
                    ),
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });

        fetch(HouseApi.url)
            .then((Response) => Response.json())
            .then((ResponseJson) => {
                this.setState({
                    error: ResponseJson.error || null,
                    loading: false,
                    HouseSource: ResponseJson,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false, refreshing: false })
            });
    }

    ShowHideComponent = () => {
        let btn = '';
        if (this.state.show == true) {
            this.setState({ show: false });
            btn = 'see less'
        } else {
            this.setState({ show: true });
            btn = 'see more'
        }
    }

    render() {
        let btn = '';
        if (this.state.show == true) {
            btn = 'SHOW LESS'
        } else {
            btn = 'SHOW MORE'
        }
        Top1 = this.state.AllMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(0, 1);;

        Top2 = this.state.AllMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(1, 2);

        Top3 = this.state.AllMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(2, 3);

        Top4to5 = this.state.AllMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(3, 5)

        Top6t10 = this.state.AllMemberSource.sort((a, b) =>
            b.Member_Total - a.Member_Total
        ).slice(5, 10)


        let ElonScore = this.state.HouseSource.filter(index => index.House_name === "Elon Mask").reduce((total, point) => total + point.House_MemberPoint, 0);
        let LarryScore = this.state.HouseSource.filter(index => index.House_name === "Larry Page").reduce((total, point) => total + point.House_MemberPoint, 0);
        let MarkScore = this.state.HouseSource.filter(index => index.House_name === "Mark Zuckerberg").reduce((total, point) => total + point.House_MemberPoint, 0);
        let BillScore = this.state.HouseSource.filter(index => index.House_name === "Bill Gates").reduce((total, point) => total + point.House_MemberPoint, 0);
        let data = [
            {
                "Hous": "Bill Gates",
                "Point": BillScore,
                "screen": "BillRank",
                "pic": Bill,
                "color": HomeColor.Bill
            }, {
                "Hous": "Elon Musk",
                "Point": ElonScore,
                "screen": "ElonRank",
                "pic": Elon,
                "color": HomeColor.Elon
            }, {
                "Hous": "Larry page",
                "Point": LarryScore,
                "screen": "LarryRank",
                "pic": Larry,
                "color": HomeColor.Larry
            }, {
                "Hous": "Mark Zuckerberg",
                "Point": MarkScore,
                "screen": "MarkRank",
                "pic": Mark,
                "color": HomeColor.Mark
            },
        ];

        let dataHouse = data.sort((a, b) => b.Point - a.Point);

        return (
            <ScrollView style={styles.allPage}>
                <View style={styles.banner}>
                    <Text style={styles.bannerText}>Top 10</Text>
                </View>
                <View
                    style={{
                        marginBottom: 10,
                    }}
                >
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
                        data={Top4to5}
                        renderItem={this.renderTop4to5}
                        keyExtractor={(item, index) => item.id}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />

                    {this.state.show ?
                        <FlatList
                            data={Top6t10}
                            renderItem={this.renderTop4to5}
                            keyExtractor={(item, index) => item.id}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh}
                        /> : null
                    }

                    <TouchableOpacity
                        onPress={this.ShowHideComponent}
                    >
                        <View style={styles.btnSeeMoreView}>
                            <Text style={styles.SeemoreText}>{btn}</Text>
                        </View>

                    </TouchableOpacity>

                </View>
                <View style={styles.banner}>
                    <Text style={styles.bannerText}>Home Ranking</Text>
                </View>
                <View style={styles.HomeView}>
                    <FlatList
                        data={dataHouse}
                        renderItem={this.renderHouse}
                        keyExtractor={(item, index) => item.id}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </View>

            </ScrollView>
        );
    }

    renderHouse = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(item.screen)}
            >
                <View style={{
                    flexDirection: 'row',
                    width: width / 1.05,
                    backgroundColor: item.color,
                    padding: 20,
                    marginTop: 10,
                    marginBottom: 5,
                    borderRadius: 10,
                    alignItems: 'center'
                }}>
                    <Image
                        source={item.pic}
                        style={styles.HomeBtn}
                    />
                    <View style={styles.OutScoreView}>
                        <View style={styles.ScoreView}>
                            <Text style={styles.TexScore}>{item.Hous}</Text>
                        </View>
                        <View style={styles.RankView}>
                            <Text style={styles.TextRank}>{item.Point}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderTop1 = ({ item }) => {
        return (
            <View style={styles.ListBox}>
                <View style={styles.rewardView}>
                    <Image source={crown} style={styles.rewardView} />
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
                    <Image source={top2} style={styles.rewardView} />
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
                    <Image source={top3} style={styles.rewardView} />
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

    renderTop4to5 = ({ item }) => {
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


const RootStack = createStackNavigator(
    {
        AllRank: {
            screen: All_Rank,
            navigationOptions: {
                title: 'COE Ranking',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#e80083'
                }
            }
        },
        BillRank: {
            screen: BillScreen,
            navigationOptions: {
                title: 'Bill Gates',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: HomeColor.Bill,
                }
            }
        },
        ElonRank: {
            screen: ElonScreen,
            navigationOptions: {
                title: 'Elon Musk',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: HomeColor.Elon,
                }
            }
        },
        LarryRank: {
            screen: LarryScreen,
            navigationOptions: {
                title: 'Larry Page',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: HomeColor.Larry,
                }
            }
        },
        MarkRank: {
            screen: MarkScreen,
            navigationOptions: {
                title: 'Mark Zuckerberg',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: HomeColor.Mark,
                }
            }
        },
    },
    {
        initialRouteName: 'AllRank',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
