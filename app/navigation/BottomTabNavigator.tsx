import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen'; // Import your ListScreen component
import UserScreen from '../screens/UserScreen'; // Import your UserScreen component
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for the tab navigator
        tabBarStyle: {
          backgroundColor: '#00796b',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
      }}
    >
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: 'Flights',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="flight" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="User "
        component={UserScreen}
        options={{
          tabBarLabel: 'User ',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;