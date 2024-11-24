import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getDatabase, get, ref } from 'firebase/database';
import firebaseApp from '../assets/firebaseConfig';
import { Flight } from '../components/Flight';
import { userID } from './LoginScreen';

const UserScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [flightData, setFlightData] = useState<any[] | null>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'User'>>();

    const userRef = ref(getDatabase(firebaseApp), 'user/' + userID);

    useFocusEffect(
        React.useCallback(() => {
            const _readUserDB = () => {
                get(userRef)
                    .then((user_snapshot) => {
                        if (user_snapshot.exists()) {
                            let userData = user_snapshot.val();
                            setUsername(userData["username"]);
                            setFlightData(Object.entries(userData["flight"]));
                        } else {
                            console.log('No User Data in DB');
                        }
                    })
                    .catch((error) => {
                        setFlightData(null);
                        console.log(error);
                    })
            };
            _readUserDB();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, {username}</Text>
            <Text style={styles.subtitle}>Your Booked Flights</Text>
                <ScrollView style={styles.scrollContainer}>
                    {flightData && flightData.length > 0 ? (
                        flightData.map(([flightID, flight_data]) => (
                            <TouchableHighlight
                                key={flightID}
                                onPress={() => {
                                    navigation.navigate('UserFlightDetail', {
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
                                        flightID: flightID,
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
                        ))
                    ) : (
                        <Text style={styles.emptyMessage}>No booked flights available.</Text>
                    )}
                </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 15,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    scrollContainer: {
        flex: 1,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default UserScreen;