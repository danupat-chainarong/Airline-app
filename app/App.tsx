import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import {EXPO_PUBLIC_API_KEY} from '@env';
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

const firebaseConfig = {
  // Add your own Firebase configuration
  apiKey: apiKey,
  authDomain: "flight-app-mobile-app-project.firebaseapp.com",
  databaseURL: "https://flight-app-mobile-app-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flight-app-mobile-app-project",
  storageBucket: "flight-app-mobile-app-project.firebasestorage.app",
  messagingSenderId: "584238601229",
  appId: "1:584238601229:web:9ff4c869a8c1c747ea7144"
};

// Initialize Firebase app
initializeApp(firebaseConfig);



const App: React.FC = () => {
  // ADD usefull func
  console.log("test");
  console.log(EXPO_PUBLIC_API_KEY);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
