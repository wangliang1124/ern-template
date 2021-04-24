/**
 * twitter entrance animation
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Settings from './Setting';
import TwitterEntrance from './TwitterEntrance';
import TwitterFlow from './TwitterFlow';

Icon.loadFont();

const Tab = createBottomTabNavigator();

class TabBarDemo extends Component {
  state = { show: true };

  hideEntrance() {
    this.setState({
      show: false,
    });
  }

  render() {
    const { show } = this.state;
    if (show) {
      return <TwitterEntrance hideThis={() => this.hideEntrance()} />;
    }
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          scrollEnabled: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={TwitterFlow}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Message"
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="email" color={color} size={size} />,
          }}
          component={Settings}
        />
        <Tab.Screen
          name="Me"
          options={{
            tabBarIcon: ({ color, size }) => <Icon name="account-box" color={color} size={size} />,
          }}
          component={Settings}
        />
      </Tab.Navigator>
    );
  }
}

export default TabBarDemo;
