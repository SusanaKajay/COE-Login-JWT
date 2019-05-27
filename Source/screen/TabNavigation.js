import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {
  AppRegistry,
} from 'react-native';
//import Container
import EventContainer from '../container/AllEvent/AllEvent';
import RankContainer from '../container/RankContainer/All_Rank';
import RewardContainer from '../container/RewardContainer/Reward';
import ProfileContainer from '../container/ProfileContainer/Profile';

class EventScreen extends React.Component {
  render() {
    return (
      <EventContainer />
    );
  }
}


class RankScreen extends React.Component {
  render() {
    return (
      <RankContainer />
    );
  }
}

class RewardScreen extends React.Component {
  render() {
    return (
      <RewardContainer />
    );
  }
}

class ProfiledScreen extends React.Component {
  render() {
    return (
      <ProfileContainer />
    );
  }
}

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;
  if (routeName === 'Event') {
    iconName = `event`;
  } else if (routeName === 'Rank') {
    iconName = `organization`;
  } else if (routeName === 'Reward') {
    iconName = `trophy`;
  } else if (routeName === 'Profile') {
    iconName = `user`;
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const RootStack = createAppContainer(
  createBottomTabNavigator(
    {
      Event: { screen: EventScreen },
      Rank: { screen: RankScreen },
      Reward: { screen: RewardScreen },
      Profile: { screen: ProfiledScreen },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: "#e80083",
        inactiveTintColor: '#e80083',

      },
    }
  )
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

AppRegistry.registerComponent('AllScreen', () => App);