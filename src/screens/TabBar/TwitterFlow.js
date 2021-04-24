import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TwitterPost from './TwitterPost';

const Tab = createMaterialTopTabNavigator();
function TwitterFlow() {
  return (
    <Tab.Navigator
      initialRouteName="Focus"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { color: '#fff', fontSize: 14 },
        style: { backgroundColor: 'rgb(29, 161, 242)' },
        showIcon: true,
        // showLabel: false,
        iconStyle: { color: 'yellow' },
      }}
    >
      <Tab.Screen
        name="News"
        component={TwitterPost}
        options={{ tabBarLabel: '新闻', tabBarIcon: () => <Icon name="newspaper" color="yellow" size={20} /> }}
      />
      <Tab.Screen
        name="Focus"
        component={TwitterPost}
        options={{
          tabBarLabel: '关注',
          tabBarIcon: () => <Icon name="home" color="yellow" size={20} />,
        }}
      />
      <Tab.Screen
        name="推荐"
        component={TwitterPost}
        options={{ tabBarLabel: '推荐', tabBarIcon: () => <Icon name="fire" color="yellow" size={20} /> }}
      />
    </Tab.Navigator>
  );
}

export default TwitterFlow;
