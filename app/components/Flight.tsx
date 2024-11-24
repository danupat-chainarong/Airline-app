import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export type FlightProps = {
  flight_num: string;
  ori_name: string;
  ori_short: string;
  start_date: string;
  start_time: string;
  dest_name: string;
  dest_short: string;
  arrive_date: string;
  arrive_time: string;
  carrier: string;
  carrier_full: string;
  price: number;
  carrier_img: string;
};

export const Flight: React.FC<FlightProps> = ({
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
      <View style={styles.flightInfo}>
        
        <View style={styles.flightHeader}>
          <Image source={{ uri: carrier_img }} style={styles.FlightLogo} />
          <View style={styles.flightSubHeader}>
            <View style={styles.flightRow}>
              <Text style={styles.Topic}>Carrier</Text>
              <Text style={styles.Topic}>Flight ID</Text>
            </View>
            <View style={styles.flightRow}>
              <Text style={styles.carrierFull}>{carrier_full}</Text>
              <Text style={styles.flightNum}>{flight_num}</Text>
            </View>
          </View>

        </View>
        <View style={styles.flightDetails}>
          <View style={styles.flightOrigin}>
            <Text style={styles.flightOriginShort}>{ori_short}</Text>
            <Text style={styles.flightOriginName}>{ori_name}</Text>
            <Text style={styles.flightOriginTime}>{start_time}</Text>
          </View>
          <View style={styles.flightPlane}>
            <Image source={require('../images/plane.png')} style={styles.planeIcon} />
          </View>
          <View style={styles.flightDestination}>
            <Text style={styles.flightDestinationShort}>{dest_short}</Text>
            <Text style={styles.flightDestinationName}>{dest_name}</Text>
            <Text style={styles.flightDestinationTime}>{arrive_time}</Text>
          </View>
        </View>
        <View style={styles.flightDate}>
          <Text style={styles.flightDateText}>{start_date} - {arrive_date}</Text>
        </View>
        <Text style={styles.price}>Price : {price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ฿ </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flight: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  FlightLogo: {
    width: 60,
    height: 60,
    margin: 1,
    flex:2,
  },
  flightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  flightInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  Topic: {
    fontSize: 14,
    marginLeft: 10,
    color: 'gray',
  },
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightSubHeader: {
    flexDirection: 'column',
    flex:9
  },
  carrierFull: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  flightNum:  {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 1,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  flightOrigin: {
    alignItems: 'flex-start',
  },
  flightOriginShort: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flightOriginName: {
    fontSize: 12,
  },
  flightOriginTime: {
    fontSize: 12,
    color: 'gray',
  },
  flightPlane: {
    alignItems: 'center',
  },
  planeIcon: {
    width:200,
    height: 50,
  },
  flightDestination: {
    alignItems: 'flex-end',
  },
  flightDestinationShort: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flightDestinationName: {
    fontSize: 12,
  },
  flightDestinationTime: {
    fontSize: 12,
    color: 'gray',
  },
  flightDate: {
    marginTop: 5,
  },
  flightDateText: {
    fontSize: 12,
    color: 'darkgray',
  },
  price: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Flight;
