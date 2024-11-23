import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { push, set, ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { RootStackParamList } from '../navigation/AppNavigator'
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../assets/firebaseConfig';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signup'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRePassword] = useState('');

  const handleButton = () => {
    if (password === re_password) {
      const userRef = ref(getDatabase(firebaseApp), 'user/');
      const newUserRef = push(userRef);
      set(newUserRef, { username, password, flight: [] });
      navigation.navigate('Login');
    } else {
      console.log("Password not match!!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.Input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.Input} placeholder='Password' value={password} secureTextEntry onChangeText={setPassword} />
      <TextInput style={styles.Input} placeholder='Re-Password' value={re_password} secureTextEntry onChangeText={setRePassword} />
      <Button onPress={handleButton} title="Signup" color="#841584" />
      <Text onPress={() => navigation.navigate("Login")} style={{ fontSize: 15, color: "blue" }}>Already have an account? Login</Text>
    </View>
  );
};

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

export default SignupScreen;