import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Button } from 'react-native';
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
    price: Float,
    carrier_img: string,
  };
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
  start_date: string,
  start_time: string,
  dest_name: string,
  dest_short: string,
  arrive_date: string,
  arrive_time: string,
  carrier: string,
  carrier_full: string,
  price: Float,
  carrier_img: string,
}

const Flight: React.FC<FlightProps> = ({
  flight_num,
  ori_name,
  ori_short,
  start_date,
  start_time,
  dest_name,
  dest_short,
  arrive_date,
  arrive_time,
  carrier,
  carrier_full,
  price,
  carrier_img,
}) => {
  return (
    <View style={styles.flight}>
      <View style={{flex:3}}>
        <Image source={{uri : carrier_img}} style={styles.FlightLogo}/>
      </View>
      <View style={{flex:4,}}>
        <Text style={{fontSize: 20}}>Flight Num: {flight_num}</Text>
        <Text style={{fontSize: 12}}>From {ori_short} to {dest_short}</Text>
        <Text style={{fontSize: 12}}>From {start_date} {start_time}</Text>
        <Text style={{fontSize: 12}}>To {arrive_date} {arrive_time}</Text>
        <Text style={{fontSize: 15, color:"green"}}>Price: {price.toFixed(2)} Baths</Text>
      </View>
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
      "start_date": "22/11/2024",
      "start_time": "11:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "08:05:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24020.,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0002",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "15:30:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "15:20:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24980.00,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0003",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "06:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "21:40:00",
      "carrier": "AERO",
      "carrier_full": "AeroJet",
      "price": 26730.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLaymGS7-NZgW4OOKUx5JWju-VMG-9IYa6g&s",
    },
    {
      "flight_num": "0004",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024",
      "start_time": "07:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024",
      "arrive_time": "18:25:00",
      "carrier": "VIVA",
      "carrier_full": "VivaJet",
      "price": 30000.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027QfI-XwewbsLZyLXM6iSI2KDJsU63HanA&s",
    },
    {
      "flight_num": "0005",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024T",
      "start_time": "18:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024T",
      "arrive_time": "06:55:00",
      "carrier": "SKY",
      "carrier_full": "SkyConnect",
      "price": 23430.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI14Su5QybSPs6dxoQa1QXBuPXvmD-06C8AA&s",
    },
    {
      "flight_num": "0006",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "11:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "08:05:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24020.,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0007",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "15:30:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "15:20:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24980.00,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0008",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "06:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "21:40:00",
      "carrier": "AERO",
      "carrier_full": "AeroJet",
      "price": 26730.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLaymGS7-NZgW4OOKUx5JWju-VMG-9IYa6g&s",
    },
    {
      "flight_num": "0009",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024",
      "start_time": "07:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024",
      "arrive_time": "18:25:00",
      "carrier": "VIVA",
      "carrier_full": "VivaJet",
      "price": 30000.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027QfI-XwewbsLZyLXM6iSI2KDJsU63HanA&s",
    },
    {
      "flight_num": "0010",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024T",
      "start_time": "18:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024T",
      "arrive_time": "06:55:00",
      "carrier": "SKY",
      "carrier_full": "SkyConnect",
      "price": 23430.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI14Su5QybSPs6dxoQa1QXBuPXvmD-06C8AA&s",
    },
    {
      "flight_num": "0011",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "11:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "08:05:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24020.,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0012",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "15:30:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "15:20:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24980.00,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0013",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "06:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "21:40:00",
      "carrier": "AERO",
      "carrier_full": "AeroJet",
      "price": 26730.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLaymGS7-NZgW4OOKUx5JWju-VMG-9IYa6g&s",
    },
    {
      "flight_num": "0014",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024",
      "start_time": "07:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024",
      "arrive_time": "18:25:00",
      "carrier": "VIVA",
      "carrier_full": "VivaJet",
      "price": 30000.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027QfI-XwewbsLZyLXM6iSI2KDJsU63HanA&s",
    },
    {
      "flight_num": "0015",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024T",
      "start_time": "18:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024T",
      "arrive_time": "06:55:00",
      "carrier": "SKY",
      "carrier_full": "SkyConnect",
      "price": 23430.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI14Su5QybSPs6dxoQa1QXBuPXvmD-06C8AA&s",
    },
    {
      "flight_num": "0016",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "11:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "08:05:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24020.,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0017",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "15:30:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "15:20:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24980.00,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0018",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "06:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "21:40:00",
      "carrier": "AERO",
      "carrier_full": "AeroJet",
      "price": 26730.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLaymGS7-NZgW4OOKUx5JWju-VMG-9IYa6g&s",
    },
    {
      "flight_num": "0019",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024",
      "start_time": "07:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024",
      "arrive_time": "18:25:00",
      "carrier": "VIVA",
      "carrier_full": "VivaJet",
      "price": 30000.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027QfI-XwewbsLZyLXM6iSI2KDJsU63HanA&s",
    },
    {
      "flight_num": "0020",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024T",
      "start_time": "18:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024T",
      "arrive_time": "06:55:00",
      "carrier": "SKY",
      "carrier_full": "SkyConnect",
      "price": 23430.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI14Su5QybSPs6dxoQa1QXBuPXvmD-06C8AA&s",
    },
    {
      "flight_num": "0021",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "11:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "08:05:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24020.,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0022",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "15:30:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "15:20:00",
      "carrier": "ECHO",
      "carrier_full": "EchoFlights",
      "price": 24980.00,
      "carrier_img": "https://static.wixstatic.com/media/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2fc393_8b25b80491d94867a533cb4896a7d9ce~mv2.png",
    },
    {
      "flight_num": "0023",
      "ori_name": "Berlin",
      "ori_short": "BER",
      "start_date": "22/11/2024",
      "start_time": "06:15:00",
      "dest_name": "Bangkok",
      "dest_short": "BKK",
      "arrive_date": "23/11/2024",
      "arrive_time": "21:40:00",
      "carrier": "AERO",
      "carrier_full": "AeroJet",
      "price": 26730.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcLaymGS7-NZgW4OOKUx5JWju-VMG-9IYa6g&s",
    },
    {
      "flight_num": "0024",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024",
      "start_time": "07:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024",
      "arrive_time": "18:25:00",
      "carrier": "VIVA",
      "carrier_full": "VivaJet",
      "price": 30000.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT027QfI-XwewbsLZyLXM6iSI2KDJsU63HanA&s",
    },
    {
      "flight_num": "0025",
      "ori_name": "Bangkok",
      "ori_short": "BKK",
      "start_date": "22/11/2024T",
      "start_time": "18:50:00",
      "dest_name": "Berlin",
      "dest_short": "BER",
      "arrive_date": "23/11/2024T",
      "arrive_time": "06:55:00",
      "carrier": "SKY",
      "carrier_full": "SkyConnect",
      "price": 23430.00,
      "carrier_img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI14Su5QybSPs6dxoQa1QXBuPXvmD-06C8AA&s",
    }
  ]
const mockUsers: UserProps[] =
  [ {name: "User 1"},
    {name: "User 2"},
  ]

const SignupScreen: React.FC =() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [re_password,setRe_Password] = useState('');
  const [error, setError] = useState('');

  const handleSignupInputChange = (type: string, value: string) => {
    if (type == "username") {
      setUsername(value);
      console.log("Username:\t",value)
    }
    else if (type == "password") {
      setPassword(value);
      console.log("Password:\t",value);
    }
    else if (type == "re-password") {
      setRe_Password(value);
      console.log("Re-Password:\t",value);
    }
  }

  const handleButton = () => {
    if (password == re_password) {
      console.log("Signup with");
      console.log("username: ",username);
      console.log("password: ",password);
      navigation.navigate('Login');
    }
    else{
      console.log("Password not match!!")
    }

  }

  return (
    <View style = {styles.container}>
      <TextInput></TextInput>
      <TextInput
        style={styles.Input}
        placeholder="Username"
        value={username}
        onChangeText={(username) => handleSignupInputChange("username",username)}
      />
      <TextInput
        style={styles.Input}
        placeholder='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={(password) => handleSignupInputChange("password",password)}
      />
      <TextInput
        style={styles.Input}
        placeholder='Re-Password'
        value={re_password}
        secureTextEntry={true}
        onChangeText={(re_password) => handleSignupInputChange("re-password",re_password)}
      />
      <Button
      onPress={handleButton}
      title="Signup"
      color="#841584"
      />
      <Text onPress={() => {navigation.navigate("Login")}} style={{fontSize:12}}>Already have an account? Login</Text>
    </View>
  )
}
  
const LoginScreen: React.FC =() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginInputChange = (type: string, value: string) => {
    if (type == "username") {
      setUsername(value);
      console.log("Username:\t",value)
    }
    else if (type == "password") {
      setPassword(value);
      console.log("Password:\t",value);
    }
  }

  const handleLoginButton = () => {
    console.log("Login with");
    console.log("username: ",username);
    console.log("password: ",password);
    navigation.navigate('Lists');
  }

  return (
    <View style = {styles.container}>
      <TextInput></TextInput>
      <TextInput
        style={styles.Input}
        placeholder="Username"
        value={username}
        onChangeText={(username) => handleLoginInputChange("username",username)}
      />
      <TextInput
      style={styles.Input}
      placeholder='Password'
      value={password}
      secureTextEntry={true}
      onChangeText={(password) => handleLoginInputChange("password",password)}
      />
      <Button
      onPress={handleLoginButton}
      title="LOGIN"
      color="#841584"
    />
    </View>
  )
}




const ListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Lists'>>();

  // Add more constant and state
  const [flightData, setFlightData] = useState<any[] | null>(mockFlights);
  const [userData, setUserData] = useState<any[] | null>(mockUsers);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);

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

  const _onPressSearch = () => {
    if (flightData && searchText!='') {
      const flightFound = flightData.filter((flight) =>
        flight.ori_name.match(new RegExp(searchText, 'i'))
      );

      setSearchResult(flightFound);
      setIsSearch(true);
      console.log("Pressed Search: ", searchText)
      console.log("searchResult: ", searchResult)
    }
    else {
      console.log("No search text!")
      setIsSearch(false);
    }
  }

  const showDefault = () => {
    return(
        <ScrollView style={{ flex: 1 }}>
          {flightData?.map((flight_data, i) => (
            <TouchableHighlight key={i} onPress={() => {
              navigation.navigate('Details', {
                flight_num : flight_data.flight_num,
                ori_name : flight_data.ori_name,
                ori_short : flight_data.ori_short,
                start_date : flight_data.start_date,
                start_time: flight_data.start_time,
                dest_name : flight_data.dest_name,
                dest_short : flight_data.dest_short,
                arrive_date : flight_data.arrive_date,
                arrive_time: flight_data.arrive_time,
                carrier : flight_data.carrier,
                carrier_full : flight_data.carrier_full,
                price : flight_data.price,
                carrier_img: flight_data.carrier_img,
              });
            }}>
              <Flight
                key={flight_data.flight_num}
                flight_num={flight_data.flight_num}
                ori_name= {flight_data.ori_name}
                ori_short= {flight_data.ori_short}
                start_date= {flight_data.start_date}
                start_time= {flight_data.start_time}
                dest_name= {flight_data.dest_name}
                dest_short= {flight_data.dest_short}
                arrive_date= {flight_data.arrive_date}
                arrive_time= {flight_data.arrive_time}
                carrier= {flight_data.carrier}
                carrier_full= {flight_data.carrier_full}
                price= {flight_data.price}
                carrier_img= {flight_data.carrier_img}
              />
            </TouchableHighlight>
          ))}
        </ScrollView>
    );
  }

  const showSearchResult = () => {
    if (searchResult && searchResult.length > 0) {
      return (
        <ScrollView style={{ flex: 1 }}>
          {searchResult?.map((flight_data, i) => (
            <TouchableHighlight onPress={() => {
              navigation.navigate('Details', {
                
                flight_num : flight_data.flight_num,
                ori_name : flight_data.ori_name,
                ori_short : flight_data.ori_short,
                start_date : flight_data.start_date,
                start_time: flight_data.start_time,
                dest_name : flight_data.dest_name,
                dest_short : flight_data.dest_short,
                arrive_date : flight_data.arrive_date,
                arrive_time: flight_data.arrive_time,
                carrier : flight_data.carrier,
                carrier_full : flight_data.carrier_full,
                price : flight_data.price,
                carrier_img: flight_data.carrier_img,
              });
            }}>
              <Flight
                key={flight_data.flight_num}
                flight_num={flight_data.flight_num}
                ori_name= {flight_data.ori_name}
                ori_short= {flight_data.ori_short}
                start_date= {flight_data.start_date}
                start_time= {flight_data.start_time}
                dest_name= {flight_data.dest_name}
                dest_short= {flight_data.dest_short}
                arrive_date= {flight_data.arrive_date}
                arrive_time= {flight_data.arrive_time}
                carrier= {flight_data.carrier}
                carrier_full= {flight_data.carrier_full}
                price= {flight_data.price}
                carrier_img= {flight_data.carrier_img}
              />
            </TouchableHighlight>
          ))}
        </ScrollView>
      );
    } else {
      console.log("No Flight Found!")
      return <Text>No restaurant found</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={{ height: 25, fontSize: 20, flex: 5}}
          placeholder="Search"
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableHighlight onPress={_onPressSearch} underlayColor="white">
          <View style={[styles.searchButton,{flex: 1}]}>
            <Image style={{ height: 30, width: 30 }} source={require('./images/search_icon.png')} />
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.flightContainer}>
        {isSearch ? showSearchResult() : showDefault()}
      </View>
    </View>
  );
}

// ADD Detailed for Detailed Screen here
const DetailScreen: React.FC = () =>{
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const {flight_num,
    ori_name,
    ori_short,
    start_date,
    start_time,
    dest_name,
    dest_short,
    arrive_date,
    arrive_time,
    carrier,
    carrier_full,
    price,
    carrier_img,} = route.params;

  return (
    <View style={{flexDirection: "column",flex:1,justifyContent: 'flex-start',}}>
      <View style={{flex:3}}>
      <Text>This is Detail for {flight_num}</Text>
      <Text>That have ori_short = {ori_short}</Text>
      <Text>That have start_date = {start_date}</Text>
      <Text>That have start_time = {start_time}</Text>
      <Text>That have dest_name = {dest_name}</Text>
      <Text>That have dest_short = {dest_short}</Text>
      <Text>That have arrive_date = {arrive_date}</Text>
      <Text>That have arrive_time = {arrive_time}</Text>
      <Text>That have carrier = {carrier}</Text>
      <Text>That have carrier_full = {carrier_full}</Text>
      <Text>That have price = {price}</Text>
      </View>
      <View style={{flex:5}}>
      <Image source={{uri : carrier_img}} style={{width:300,height:300}}/>
      </View>
    </View>
  )
}

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
       <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            title: 'Signup',
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
          name="Login"
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
    justifyContent: 'flex-start',
    padding: 5,
  },
  searchArea: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#E5E4E3',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButton: {
    marginLeft: 10,
  },
  flight: {
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    backgroundColor: '#FFFFFF',
    
  },
  flightContainer: {
    padding: 5,
    margin: 10,
    backgroundColor: '#E5E4E3',
    // width: 350,
    flex: 1,
  },
  FlightLogo: {
    width: 100,
    height: 100,
    margin: 3,
  },
  Input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
