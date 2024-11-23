import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, ScrollView, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { get, ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import Flight from '../components/Flight';
import { useNavigation } from '@react-navigation/native';
import { format } from "date-fns";
import { RootStackParamList } from '../navigation/AppNavigator'
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../assets/firebaseConfig';

const ListScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Lists'>>();
    const [flightData, setFlightData] = useState<any[] | null>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [searchResult, setSearchResult] = useState<any[] | null>(null);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);  // To manage loading state
    
    
    // const today = format(new Date(), "dd/MM/yyyy");
    let today = "22/11/2024"

    const flightRef = ref(getDatabase(firebaseApp), 'flight/');
  
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
              <Image style={{ height: 30, width: 30 }} source={require('../images/search_icon.png')} />
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.flightContainer}>
          {isSearch ? showSearchResult() : showToday()}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  flightContainer: {
    flex: 1,
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
});

export default ListScreen;