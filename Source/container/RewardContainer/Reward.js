import React, { Component } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Image,
  Picker,
  ScrollView,
} from 'react-native';
import styles from './Style';
import { coin, box } from '../../../img/imgIndext';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { rewardAPI, memberAPI } from '../../themes/variables'
import userState from '../../store/UserState';


class Reward extends Component {

  constructor() {
    super()
    this.state = {
      RewardSource: [],
      MemberSource: [],
      sortDataBy: 'latest',
      loading: false,
      refreshing: false,
      error: null,
      page: 1,
      seed: 1,
      Select: "latest",
    }
  }

  componentDidMount() {
    this.RemoteRequest();
  }

  RemoteRequest = () => {
    const getVariableFromLogin = '58113242'
    //const getVariableFromLogin = userState.getid
    fetch(rewardAPI.url)
      .then((Response) => Response.json())
      .then((ResponseJson) => {
        this.setState({
          error: ResponseJson.error || null,
          loading: false,
          RewardSource: ResponseJson.filter(index => index.Reward_Quantity != 0),
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false })
      });

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


  }

  render() {
    MyPoint = this.state.MemberSource.Member_ID;
    return (
      <ScrollView style={{ backgroundColor: 'white' }} >

        <FlatList
          data={this.state.MemberSource}
          renderItem={this.renderMemberItem}
          keyExtractor={(item, index) => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          ListFooterComponent={this.renderFooter}
        />

        <Picker
          selectedValue={this.state.Select}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            if (itemValue == "latest") {
              this.setState({
                Select: "latest",
                RewardSource: this.state.RewardSource.reverse()
              })
            } else if (itemValue == "low2hight") {
              this.setState({
                Select: "low2hight",
                RewardSource: this.state.RewardSource.sort((a, b) => a.Reward_Point - b.Reward_Point)
              })
            } else if (itemValue == "hight2low") {
              this.setState({
                Select: "hight2low",
                RewardSource: this.state.RewardSource.sort((a, b) => b.Reward_Point - a.Reward_Point)
              })
            }
          }}>
          <Picker.Item label="Latest" value="latest" />
          <Picker.Item label="Price Low to Hight" value="low2hight" />
          <Picker.Item label="Price Hight to Low" value="hight2low" />
        </Picker>

        {
          this.state.Select == "latest" &&
          < FlatList
            data={this.state.RewardSource}
            renderItem={this.renderItem}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            ListFooterComponent={this.renderFooter}
          />
        }

        {
          this.state.Select == "low2hight" &&
          < FlatList
            data={this.state.RewardSource}
            renderItem={this.renderItem}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            ListFooterComponent={this.renderFooter}
          />
        }

{
          this.state.Select == "hight2low" &&
          < FlatList
            data={this.state.RewardSource}
            renderItem={this.renderItem}
            numColumns={2}
            keyExtractor={(item, index) => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            ListFooterComponent={this.renderFooter}
          />
        }
      </ScrollView>
    );
  }

  renderMemberItem = ({ item }) => {
    return (
      <View style={styles.TotalPointView}>
        <Text style={styles.PointText2}>My Wallet</Text>
        <View style={styles.PointView}>
          <Image
            source={coin}
            style={styles.PointIcon}
          />
          <Text style={styles.PointText}>{item.Member_Available}</Text>
        </View>
      </View>
    )
  }
  renderItem = ({ item }) => {
    return (
      <View style={styles.ListBox}>
        <View style={styles.imageView}>
          <Image
            source={{ uri: item.Reward_Photo }}
            style={styles.image}
          />
        </View>
        <View style={styles.DetaiilView}>
          <View style={styles.NameOfDetailView}>
            <Text style={styles.nameText}>{item.Reward_Name}</Text>
          </View>
          <View style={styles.SupDetailView}>
            <View style={styles.SupView}>
              <Image source={coin} style={styles.icon} />
              <Text style={styles.DetailText}>{item.Reward_Point}</Text>
            </View>
            <View style={styles.SupView}>
              <Image source={box} style={styles.icon} />
              <Text style={styles.DetailText}>x {item.Reward_Quantity}</Text>
            </View>
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


const RootStack = createStackNavigator(
  {
    Reward: {
      screen: Reward,
      navigationOptions: {
        title: 'COE Rewards',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#e80083'
        }
      }
    },
  },
  {
    initialRouteName: 'Reward',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
