import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { push, set, ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../firebaseConfig';
import { userID } from './LoginScreen';

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
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default DetailScreen;