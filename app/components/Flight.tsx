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
      <View style={{ flex: 5 }}>
        <Image source={{ uri: carrier_img }} style={styles.FlightLogo} />
      </View>
      <View style={{ flex: 9 }}>
        <Text style={{ fontSize: 20 }}>Flight Num : {flight_num}</Text>
        <Text style={{ fontSize: 12 }}>From {ori_short} to {dest_short}</Text>
        <Text style={{ fontSize: 12 }}>Start Date : {start_date}, {start_time}</Text>
        <Text style={{ fontSize: 12 }}>Arrive Date : {arrive_date}, {arrive_time}</Text>
        <Text style={{ fontSize: 15, color: "#00796b" }}>Price : {price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ฿</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flight: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#615757',
    shadowOpacity: 0.95,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    
  },
  FlightLogo: {
    width: 100,
    height: 100,
    margin: 3,
  },
});

export default Flight;