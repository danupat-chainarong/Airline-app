import { initializeApp } from 'firebase/app';
import { API_KEY } from '@env'; 

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "flight-app-mobile-app-project.firebaseapp.com",
  databaseURL: "https://flight-app-mobile-app-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flight-app-mobile-app-project",
  storageBucket: "flight-app-mobile-app-project.firebasestorage.app",
  messagingSenderId: "584238601229",
  appId: "1:584238601229:web:9ff4c869a8c1c747ea7144"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp; // Export the initialized app for use in other files