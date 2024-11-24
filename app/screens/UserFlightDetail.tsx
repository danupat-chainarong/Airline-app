import React from 'react';
import { View, Text, Image, Button, StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { push, set, ref, remove } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { userID } from './LoginScreen';

const UserFlightDetail: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'UserFlightDetail'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'UserFlightDetail'>>();
    const { flight_num,
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
        flightID, } = route.params;
    const FlighIDRef = ref(getDatabase(), "user/" + userID + "/flight/"+flightID)

    const handleButton = () => {
        console.log("You are Canceling flight num:", flight_num)
        console.log("For user ID", userID)
        remove(FlighIDRef);
        navigation.navigate("Home")

    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Flight Details</Text>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Flight Number:</Text>
                    <Text style={styles.value}>{flight_num}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>From:</Text>
                    <Text style={styles.value}>{ori_name} ({ori_short})</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Departure:</Text>
                    <Text style={styles.value}>{start_date} at {start_time}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>To:</Text>
                    <Text style={styles.value}>{dest_name} ({dest_short})</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Arrival:</Text>
                    <Text style={styles.value}>{arrive_date} at {arrive_time}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Carrier:</Text>
                    <Text style={styles.value}>{carrier_full} ({carrier})</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.value}>{price.toFixed(2)} Baths</Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: carrier_img }} style={styles.image} resizeMode="contain" />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleButton}>
                <Text style={styles.buttonText}>Cancel this Flight</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        elevation: 3,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
 marginBottom: 10,
        color: '#333',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    button: {
        backgroundColor: 'darkred',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserFlightDetail;