import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';


export type RootStackParamList = {
  Signup: undefined; //
  Login: undefined; // LOGIN PAGE
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
  UserFlightDetail: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();


const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Lists" component={ListScreen} options={{ title: 'Airline Booking' }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Airline Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;