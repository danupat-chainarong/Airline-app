import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Image, TextInput, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, push, set, query, orderByChild, equalTo } from 'firebase/database';
import {API_KEY} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { format } from "date-fns";

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
  UserFlightDetail: undefined;
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
  username: string,
  password: string,
  flight: FlightProps[],
}

const flightRef = ref(getDatabase(), 'flight/');
const userRef = ref(getDatabase(), 'user/');

const SignupScreen: React.FC =() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signup'>>();
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
      const newUserRef = push(userRef);

      set(newUserRef, {
        username:username,
        password:password,
        flight: []
      })
      console.log(newUserRef)
      navigation.navigate('Login');
    }
    else{
      console.log("Password not match!!")
    }

  }

  return (
    <View style = {styles.container}>
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
      <Text onPress={() => {navigation.navigate("Login")}} style={{fontSize:15,color:"blue"}}>Already have an account? Login</Text>
    </View>
  )
}
let userID: string;

const LoginScreen: React.FC =() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<any[] | null>();
  // const [userID,setUserID] = useState('');
  const [error, setError] = useState('');

  const [flightData, setFlightData] = useState<any[] | null>();

  
  useEffect(() => {
    _readUserDB();
  })

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

  const handleButton = () => {
    console.log("Login with");
    console.log("username: ",username);
    console.log("password: ",password);
    console.log(userData);
    if (userData && username!='') {
      const userFound = Object.entries(userData).filter(([key, value]) => {
        return value.username == username; 
      }
      );
      console.log("userFound", userFound);
      if (userFound) {
        const correct_pass = userFound[0][1]['password'];
        if (correct_pass == password) {
          console.log("Correct password!");
          userID = userFound[0][0];
          console.log("UserID",userID);
          navigation.navigate('Lists');
        }else{
          console.log("Incorrect Pass!!!")
        }
      } else{
        console.log("Username is incorrect")
      }
    }
    else {
      console.log("Username is blank")
    }
  }

  return (
    <View style = {styles.container}>
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
      onPress={handleButton}
      title="LOGIN"
      color="#841584"
    />
    </View>
  )
}

const UserScreen: React.FC<UserProps> = ({
  username,
  password,
  flight
}) => {
  return (
    <Text style={{fontSize: 20}}>User NAME: {username}</Text>
  );
}

const ListScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Lists'>>();
  const [flightData, setFlightData] = useState<any[] | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[] | null>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);  // To manage loading state
  const today = format(new Date(), "dd/MM/yyyy");

  useEffect(() => {
    _readFlightDB();
  }, []); 

  const _readFlightDB = () => {
    setLoading(true);  
    get(flightRef)
      .then((flight_snapshot) => {
        if (flight_snapshot.exists()) {
          setFlightData(flight_snapshot.val());
          console.log("Flight from DB:", flight_snapshot.val());
        } else {
          console.log('No Flight Data in DB');
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const _onPressSearch = () => {
    if (flightData && searchText !== '') {
      const flightFound = flightData.filter((flight) =>
        flight.dest_name.match(new RegExp(searchText, 'i'))
      );

      setSearchResult(flightFound);
      setIsSearch(true);
      console.log("Pressed Search: ", searchText);
    } else {
      console.log("No search text!");
      setIsSearch(false);
    }
  };

  const showToday = () => {
    console.log("Showing Today")
    console.log("TODAY:",today);
    if (!flightData) {
      return <Text>No flight data available</Text>;
    }

    const todayFlightData = flightData.filter((flight) => {
      console.log(flight.start_date)
      return flight.start_date==today
    });
    console.log("todayFlightData", todayFlightData);

    return (
      <ScrollView style={{ flex: 1 }}>
        {todayFlightData?.map((flight_data, i) => (
          <TouchableHighlight
            key={i}
            onPress={() => {
              navigation.navigate('Details', {
                flight_num: flight_data.flight_num,
                ori_name: flight_data.ori_name,
                ori_short: flight_data.ori_short,
                start_date: flight_data.start_date,
                start_time: flight_data.start_time,
                dest_name: flight_data.dest_name,
                dest_short: flight_data.dest_short,
                arrive_date: flight_data.arrive_date,
                arrive_time: flight_data.arrive_time,
                carrier: flight_data.carrier,
                carrier_full: flight_data.carrier_full,
                price: flight_data.price,
                carrier_img: flight_data.carrier_img,
              });
            }}>
            <Flight
              flight_num={flight_data.flight_num}
              ori_name={flight_data.ori_name}
              ori_short={flight_data.ori_short}
              start_date={flight_data.start_date}
              start_time={flight_data.start_time}
              dest_name={flight_data.dest_name}
              dest_short={flight_data.dest_short}
              arrive_date={flight_data.arrive_date}
              arrive_time={flight_data.arrive_time}
              carrier={flight_data.carrier}
              carrier_full={flight_data.carrier_full}
              price={flight_data.price}
              carrier_img={flight_data.carrier_img}
            />
          </TouchableHighlight>
        ))}
      </ScrollView>
    );
  };

  const showSearchResult = () => {
    if (searchResult && searchResult.length > 0) {
      return (
        <ScrollView style={{ flex: 1 }}>
          {searchResult.map((flight_data, i) => (
            <TouchableHighlight key={i} onPress={() => {
              navigation.navigate('Details', {
                flight_num: flight_data.flight_num,
                ori_name: flight_data.ori_name,
                ori_short: flight_data.ori_short,
                start_date: flight_data.start_date,
                start_time: flight_data.start_time,
                dest_name: flight_data.dest_name,
                dest_short: flight_data.dest_short,
                arrive_date: flight_data.arrive_date,
                arrive_time: flight_data.arrive_time,
                carrier: flight_data.carrier,
                carrier_full: flight_data.carrier_full,
                price: flight_data.price,
                carrier_img: flight_data.carrier_img,
              });
            }}>
              <Flight
                flight_num={flight_data.flight_num}
                ori_name={flight_data.ori_name}
                ori_short={flight_data.ori_short}
                start_date={flight_data.start_date}
                start_time={flight_data.start_time}
                dest_name={flight_data.dest_name}
                dest_short={flight_data.dest_short}
                arrive_date={flight_data.arrive_date}
                arrive_time={flight_data.arrive_time}
                carrier={flight_data.carrier}
                carrier_full={flight_data.carrier_full}
                price={flight_data.price}
                carrier_img={flight_data.carrier_img}
              />
            </TouchableHighlight>
          ))}
        </ScrollView>
      );
    } else {
      console.log("No Flight Found!");
      return <Text>No flight found</Text>;
    }
  };

  // If the data is still loading, show a loading message
  if (loading) {
    console.log("Loading flights...");
    return <Text>Loading flights...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={{ height: 40, fontSize: 15, flex: 5 }}
          placeholder="Where to go??"
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableHighlight onPress={_onPressSearch} underlayColor="white">
          <View style={[styles.searchButton, { flex: 1, }]}>
            <Image style={{ height: 30, width: 30 }} source={require('./images/search_icon.png')} />
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.flightContainer}>
        {isSearch ? showSearchResult() : showToday()}
      </View>
    </View>
  );
};

// ADD Detailed for Detailed Screen here
const DetailScreen: React.FC = () =>{
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Lists'>>();
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
  
  const UserIDRef = ref(getDatabase(),"user/"+userID+"/flight/")

  const handleButton = () => {
    console.log("You are booking flight num:",flight_num)
    console.log("For user ID", userID)
    const newUserFlightRef = push(UserIDRef)
    set(newUserFlightRef, {
      "flight_num":flight_num,
      "ori_name":ori_name,
      "ori_short":ori_short,
      "start_date":start_date,
      "start_time":start_time,
      "dest_name":dest_name,
      "dest_short":dest_short,
      "arrive_date":arrive_date,
      "arrive_time":arrive_time,
      "carrier":carrier,
      "carrier_full":carrier_full,
      "price":price,
      "carrier_img":carrier_img
    })
    navigation.navigate("Lists")

  }

  return (
    <View style={{flexDirection: "column",flex:1,justifyContent: 'flex-start',}}>
      <View style={{flex:3}}>
      <Text>This is Detail for {flight_num}</Text>
      <Text>That have ori_name = {ori_name}</Text>
      <Text>That have ori_short = {ori_short}</Text>
      <Text>That have start_date = {start_date}</Text>
      <Text>That have start_time = {start_time}</Text>
      <Text>That have dest_name = {dest_name}</Text>
      <Text>That have dest_short = {dest_short}</Text>
      <Text>That have arrive_date = {arrive_date}</Text>
      <Text>That have arrive_time = {arrive_time}</Text>
      <Text>That have carrier = {carrier}</Text>
      <Text>That have carrier_full = {carrier_full}</Text>
      <Text>That have price = {price.toFixed(2)}</Text>
      </View>
      <View style={{flex:5}}>
      <Image source={{uri : carrier_img}} style={{width:300,height:300}}/>
      </View>
      <View style = {{flex: 2}}>
        <Button
        onPress={handleButton}
        title="Book this flight"
        color="green"
        />
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
        <Stack.Screen
          name="User"
          component={DetailScreen}
          options={{
            title: 'User Details',
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
          name="UserFlightDetail"
          component={DetailScreen}
          options={{
            title: 'User Filgth Details',
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
    padding: 5,
    backgroundColor: '#E5E4E3',
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButton: {
    marginLeft: 10,
    justifyContent:"center",
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
