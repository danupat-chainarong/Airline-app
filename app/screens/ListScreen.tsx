import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, TouchableHighlight, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { get, ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import Flight from '../components/Flight';
import { useNavigation } from '@react-navigation/native';
import { format } from "date-fns";
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../assets/firebaseConfig';

const ListScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Lists'>>();
    const [flightData, setFlightData] = useState<any[]>([]);
    const [searchDestName, setSearchDestName] = useState('');
    const [searchOriName, setSearchOriName] = useState('');
    const [searchDay, setSearchDay] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchPriceMin, setSearchPriceMin] = useState('');
    const [searchPriceMax, setSearchPriceMax] = useState('');
    const [searchResult, setSearchResult] = useState<any[] | null>(null);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    
    const today = format(new Date(), "dd/MM/yyyy");
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
        let filteredFlights = flightData;
        // Filter by destination name
        if (searchDestName || searchOriName || searchDay || searchMonth || searchYear || searchPriceMin || searchPriceMax) {
            if (searchDestName) {
                filteredFlights = filteredFlights.filter(flight =>
                    flight.dest_name.toLowerCase().includes(searchDestName.toLowerCase())
                );
            }
    
            // Filter by origin name
            if (searchOriName) {
                filteredFlights = filteredFlights.filter(flight =>
                    flight.ori_name.toLowerCase().includes(searchOriName.toLowerCase())
                );
            }
    
            // Filter by day, month, and year
            if (searchDay || searchMonth || searchYear) {
                filteredFlights = filteredFlights.filter(flight => {
                    const [flightDay, flightMonth, flightYear] = flight.start_date.split('/'); // Split the date
    
                    const matchesDay = searchDay ? flightDay === searchDay : true;
                    const matchesMonth = searchMonth ? flightMonth === searchMonth : true;
                    const matchesYear = searchYear ? flightYear === searchYear : true;
    
                    return matchesDay && matchesMonth && matchesYear;
                });
            }
    
            // Filter by price range
            if (searchPriceMin || searchPriceMax) {
                const minPrice = searchPriceMin ? parseFloat(searchPriceMin) : 0;
                const maxPrice = searchPriceMax ? parseFloat(searchPriceMax) : Infinity;
    
                filteredFlights = filteredFlights.filter(flight =>
                    flight.price >= minPrice && flight.price <= maxPrice
                );
            }
    
            // Update the flight data with filtered results
            setSearchResult(filteredFlights);
            setIsSearch(true);
        } else {
            setIsSearch(false);
            console.log("No search input");
        }
    };
  
    const showToday = () => {
        if (!flightData) {
            return <Text>No flight data available</Text>;
        }
  
        const todayFlightData = flightData.filter((flight) => flight.start_date === today);
  
        return (
            <ScrollView style={{ flex: 1 }}>
                {todayFlightData.length > 0 ? todayFlightData.map((flight_data, i) => (
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
                )) : (
                    <Text>No flights available for today.</Text>
                )}
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
            return <Text>No flight found</Text>;
        }
    };
  
    // If the data is still loading, show a loading message
    if (loading) {
        return <ActivityIndicator size="large" color="darkred" style={styles.loadingIndicator} />;
    }
  
    return (
        <View style={styles.container}>
            <ScrollView style={styles.searchCard}>
                <Text style={styles.label}>Destination City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Destination City"
                    onChangeText={setSearchDestName}
                />
                 <Text style={styles.blank}></Text>
                <Text style={styles.label}>Origin City</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Origin City"
                    onChangeText={setSearchOriName}
                />
                <Text style={styles.blank}></Text>
                <Text style={styles.label}>Departure Date</Text>
                
                
                <View style={styles.datePriceContainer}>
                    <View style={styles.dateInputContainer}>
                        <Text style={styles.label}>Day (DD)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD"
                            keyboardType="numeric"
                            onChangeText={setSearchDay}
                        />
                    </View>
                    <View style={styles.dateInputContainer}>
                        <Text style={styles.label}>Month (MM)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM"
                            keyboardType="numeric"
                            onChangeText={setSearchMonth}
                        />
                    </View>
                    <View style={styles.dateInputContainer}>
                        <Text style={styles.label}>Year (YYYY)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="YYYY"
                            keyboardType="numeric"
                            onChangeText={setSearchYear}
                        />
                    </View>
                </View>

                <Text style={styles.blank}></Text>
                <View style={styles.priceInputContainer}>
                    <View style={styles.priceInput}>
                        <Text style={styles.label}>Min Price</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Min Price"
                            keyboardType="numeric"
                            onChangeText={setSearchPriceMin}
                        />
                    </View>
                    <View style={styles.priceInput}>
                        <Text style={styles.label}>Max Price</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Max Price"
                            keyboardType="numeric"
                            onChangeText={setSearchPriceMax}
                        />
                    </View>
                </View>
                <TouchableHighlight style={styles.searchButton} onPress={_onPressSearch}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableHighlight>
            </ScrollView>
            <View style={styles.flightContainer}>
                {isSearch ? showSearchResult() : showToday()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#e3fffc',
    },
    searchCard: {
        maxHeight: '360',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 13,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        marginBottom: 5,
        
    },
    label: {
        fontSize: 14,
        color: '#333',
    },

    blank: {
        fontSize: 4,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    datePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInputContainer: {
        flex: 1,
    },
    priceInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:5,
    },
    priceInput: {
        flex: 1,
        marginRight: 5,
    },
    searchButton: {
        backgroundColor: '#00796b',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    flightContainer: {
        flex: 1,
    },
    loadingIndicator: {
        marginTop: 20,
    },
});

export default ListScreen;