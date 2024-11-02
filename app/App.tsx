import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import {API_KEY} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// Define types for navigation parameters
type RootStackParamList = {
  Home: undefined; // LOGIN PAGE
  Lists: undefined;
  Details: { flightName: string};
  User: undefined;
};


const firebaseConfig = {
  // Add your own Firebase configuration
  apiKey: API_KEY,
  authDomain: "flight-app-mobile-app-project.firebaseapp.com",
  databaseURL: "https://flight-app-mobile-app-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flight-app-mobile-app-project",
  storageBucket: "flight-app-mobile-app-project.firebasestorage.app",
  messagingSenderId: "584238601229",
  appId: "1:584238601229:web:9ff4c869a8c1c747ea7144"
}
// Initialize Firebase app
initializeApp(firebaseConfig);

//FLIGHT
type FlightProps = {
  // Add attribute of flight
  flightName: string,

}

const Flight: React.FC<FlightProps> = ({
  flightName,
}) => {
  return (
    <Text style={{fontSize: 20}}>Flight NAME: {flightName}</Text>
  );
}

// USER
type UserProps = {
  // Add attribute of User
  name: string,
}

const User: React.FC<UserProps> = ({
  name,
}) => {
  return (
    <Text style={{fontSize: 20}}>User NAME: {name}</Text>
  );
}


// MOCK DATA
const mockFlights: FlightProps[] =
  [ {flightName: "flight 1"},
    {flightName: "flight 2"},
    {flightName: "flight 3"},
  ]

const mockUsers: UserProps[] =
  [ {name: "User 1"},
    {name: "User 2"},
  ]


const ListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Lists'>>();

  // Add more constant and state
  const [flightData, setFlightData] = useState<any[] | null>(mockFlights);
  const [userData, setUserData] = useState<any[] | null>(mockUsers);

  const flightRef = ref(getDatabase(), 'flight/');
  const userRef = ref(getDatabase(), 'user/');
  
  // useEffect(() => {
  //   _readFlightDB();
  //   _readUserDB();
  // })

  // ADD usefull func
  const _readFlightDB = () => {
    get(flightRef)
      .then((flight_snapshot) => {
        if (flight_snapshot.exists()) {
          setFlightData(flight_snapshot.val());
          // console.log("Flight from DB:",flight_snapshot.val());
        } else {
          console.log('No Flight Data in DB');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const _readUserDB = () => {
    get(userRef)
      .then((user_snapshot) => {
        if (user_snapshot.exists()) {
          setUserData(user_snapshot.val());
          // console.log("User from DB:",user_snapshot.val());
        } else {
          console.log('No User Data in DB');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      {userData?.map((user_data, i) => (
        <User name={user_data.name}/>
      ))}
      
      <ScrollView style={{ flex: 1 }}>
        {flightData?.map((flight_data, i) => (
          <TouchableHighlight onPress={() => {
            navigation.navigate('Details', {
              flightName: flight_data.flightName,
            });
          }}>
            <Flight
              key={i}
              flightName={flight_data.flightName}
            />
          </TouchableHighlight>
          
        ))}
      </ScrollView>
    </View>
  );
}

// ADD Detailed for Detailed Screen here
const DetailScreen: React.FC = () =>{
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const {flightName} = route.params;

  return (
    <Text>This is Detail for {flightName}</Text>
  )
}

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lists">
        <Stack.Screen
          name="Lists"
          component={ListScreen}
          options={{
            title: 'Airline Booking',
            headerStyle: {
              backgroundColor: 'darkred',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            title: 'Airline Details',
            headerStyle: {
              backgroundColor: 'darkred',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
