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
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

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
  flight_num: string,
  ori_name: string,
  ori_short: string,
  start_date: Date,
  // start_time: TimeRanges,
  dest_name: string,
  dest_short: string,
  arrive_date: Date,
  // arrive_time: TimeRanges,
  carrier: string,
  carrier_full: string,
  price: Float,
}

const Flight: React.FC<FlightProps> = ({
  flight_num,
  ori_name,
  ori_short,
  start_date,
  // start_time: TimeRanges,
  dest_name,
  dest_short,
  arrive_date,
  // arrive_time: TimeRanges,
  carrier,
  carrier_full,
  price,
}) => {
  return (
    <View style={styles.flight}>
      <Text style={{fontSize: 20}}>Flight Num: {flight_num}</Text>
      <Text style={{fontSize: 12}}>From {ori_short} to {dest_short}</Text>
      <Text style={{fontSize: 12}}>{start_date}</Text>
      <Text style={{fontSize: 15, color:"green"}}>Price: {price} Baths</Text>
    </View>

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
  [
    {
      "flight_num": "0001",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": new Date("22/11/2024T11:15:00"),
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": new Date("23/11/2024T8:05:00"),
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24020.00
    },
    {
      "flight_num": "0002",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": new Date("22/11/2024T15:30:00"),
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": new Date("23/11/2024T15:20:00"),
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24980.00
    },
    {
      "flight_num": "0003",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": new Date("22/11/2024T6:15:00"),
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": new Date("23/11/2024T21:40:00"),
      "carrier": "AERO",
      "carrier_full": "AeroJet",
      "price": 26730.00
    },
    {
      "flight_num": "0004",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": new Date("22/11/2024T7:50:00"),
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": new Date("23/11/2024T18:25:00"),
      "carrier": "VIVA",
      "carrier_full": "VivaJet",
      "price": 30000.00
    },
    {
      "flight_num": "0005",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": new Date("22/11/2024T18:50:00"),
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": new Date("23/11/2024T6:55:00"),
      "carrier": "SKY",
      "carrier_full": "SkyConnect",
      "price": 23430.00
    }
  ]
const mockUsers: UserProps[] =
  [ {name: "User 1"},
    {name: "User 2"},
  ]

const LoginScreen: React.FC =() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <View style = {styles.container}>
       <TouchableHighlight style={styles.container} onPress={() => {
            navigation.navigate('Lists');
          }}>
        <Text>LOGIN</Text>
      </TouchableHighlight>
    </View>
  )
}

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
      <ScrollView style={{ flex: 1 }}>
        {flightData?.map((flight_data, i) => (
          <TouchableHighlight onPress={() => {
            navigation.navigate('Details', {
              flightName: flight_data.flightName,
            });
          }}>
            <Flight
              key={flight_data.flight_num}
              flight_num={flight_data.flight_num}
              ori_name= {flight_data.ori_name}
              ori_short= {flight_data.ori_short}
              start_date= {flight_data.start_date}
              dest_name= {flight_data.dest_name}
              dest_short= {flight_data.dest_short}
              arrive_date= {flight_data.arrive_date}
              carrier= {flight_data.carrier}
              carrier_full= {flight_data.carrier_full}
              price= {flight_data.price}
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{
            title: 'Login',
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
  flight: {
    padding: 5,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
});
