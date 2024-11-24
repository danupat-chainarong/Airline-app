import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import UserScreen from '../screens/UserScreen';
import UserFlightDetail from '../screens/UserFlightDetail'
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  Lists: undefined;
  Details: {
    flight_num: string,
    ori_name: string,
    ori_short: string,
    start_date: string,
    start_time: string,
    dest_name: string,
    dest_short: string,
    arrive_date: string,
    arrive_time: string,
    carrier: string,
    carrier_full: string,
    price: Number,
    carrier_img: string,
  };
  User: undefined;
  UserFlightDetail: {
    flight_num: string,
    ori_name: string,
    ori_short: string,
    start_date: string,
    start_time: string,
    dest_name: string,
    dest_short: string,
    arrive_date: string,
    arrive_time: string,
    carrier: string,
    carrier_full: string,
    price: Number,
    carrier_img: string,
    flightID: string,
  };
};
const Stack = createStackNavigator<RootStackParamList>();


const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home" 
          component={BottomTabNavigator} 
          // options={{ headerShown: false }}
        /> 
        
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Airline Details' }} />
        <Stack.Screen name="UserFlightDetail" component={UserFlightDetail} options={{ title: 'Airline Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;