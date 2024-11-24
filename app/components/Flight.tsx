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
      <View style={{ flex: 3 }}>
        <Image source={{ uri: carrier_img }} style={styles.FlightLogo} />
      </View>
      <View style={{ flex: 4 }}>
        <Text style={{ fontSize: 20 }}>Flight Num: {flight_num}</Text>
        <Text style={{ fontSize: 12 }}>From {ori_short} to {dest_short}</Text>
        <Text style={{ fontSize: 12 }}>From {start_date} {start_time}</Text>
        <Text style={{ fontSize: 12 }}>To {arrive_date} {arrive_time}</Text>
        <Text style={{ fontSize: 15, color: "green" }}>Price: {price.toFixed(2)} Baths</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flight: {
    flexDirection: 'row',
    padding: 5,
    margin: 5,
    backgroundColor: '#FFFFFF',
  },
  FlightLogo: {
    width: 100,
    height: 100,
    margin: 3,
  },
});

export default Flight;