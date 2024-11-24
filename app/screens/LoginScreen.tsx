import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, get, ref } from 'firebase/database';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import firebaseApp from '../assets/firebaseConfig';

export let userID: string;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<any[] | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userRef = ref(getDatabase(firebaseApp), 'user/');

  useEffect(() => {
    _readUserDB();
  }, []);

  const _readUserDB = () => {
    get(userRef)
      .then((user_snapshot) => {
        if (user_snapshot.exists()) {
          setUserData(user_snapshot.val());
        } else {
          console.log('No User Data in DB');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLoginInputChange = (type: string, value: string) => {
    if (type === "username") {
      setUsername(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  const handleButton = () => {
    setLoading(true);
    setError('');
    if (userData && username !== '') {
      const userFound = Object.entries(userData).filter(([key, value]) => {
        return value.username === username; 
      });
      
      if (userFound.length > 0) {
        const correct_pass = userFound[0][1]['password'];
        if (correct_pass === password) {
          userID = userFound[0][0];
          navigation.navigate('Home');
        } else {
          setError('Incorrect password!');
        }
      } else {
        setError('Username not found!');
      }
    } else {
      setError('Username cannot be blank!');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(username) => handleLoginInputChange("username", username)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => handleLoginInputChange("password", password)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleButton} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>
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
  loginButton: {
    backgroundColor: '#00796b' ,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;