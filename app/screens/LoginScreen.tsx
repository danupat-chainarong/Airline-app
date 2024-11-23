import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get, ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { RootStackParamList } from '../navigation/AppNavigator'
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../assets/firebaseConfig';

export let userID: string;

const LoginScreen: React.FC =() => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<any[] | null>();

  const userRef = ref(getDatabase(firebaseApp), 'user/');

  
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 5,
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

export default LoginScreen;