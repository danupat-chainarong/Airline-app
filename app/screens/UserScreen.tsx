import { userID } from './LoginScreen';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

type UserProps = {
  username: string;
  password: string;
  flight: any[];
};

const UserScreen: React.FC<UserProps> = ({ username }) => {
  return (
    <Text style={styles.userText}>User  NAME: {username}</Text>
  );
};

const styles = StyleSheet.create({
  userText: {
    fontSize: 20,
  },
});

export default UserScreen;