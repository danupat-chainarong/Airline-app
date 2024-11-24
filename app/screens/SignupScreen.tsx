import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { push, set, ref } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../assets/firebaseConfig';

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signup'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleButton = () => {
    if (password === re_password) {
      setLoading(true);
      const userRef = ref(getDatabase(firebaseApp), 'user/');
      const newUserRef = push(userRef);
      set(newUserRef, { username, password, flight: [] })
        .then(() => {
          navigation.navigate('Login');
        })
        .catch((err) => {
          console.error(err);
          setError('Signup failed. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Passwords do not match!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={username} 
          onChangeText={setUsername} 
        />
        <TextInput 
          style={styles.input} 
          placeholder='Password' 
          value={password} 
          secureTextEntry 
          onChangeText={setPassword} 
        />
        <TextInput 
          style={styles.input} 
          placeholder='Re-Password' 
          value={re_password} 
          secureTextEntry 
          onChangeText={setRePassword} 
        />
        <TouchableOpacity style={styles.signupButton} onPress={handleButton}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signupButtonText}>Signup</Text>
          )}
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("Login")} style={styles.loginText}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Light blue background
    justifyContent: 'center',
    padding: 15,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b', // Darker blue-green color
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#00796b', // Darker blue-green border
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: '#00796b', // Dark blue-green for button
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#ffffff', // White text for button
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loginText: {
    fontSize: 15,
    color: "#00796b", // Darker blue-green for login text
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignupScreen;