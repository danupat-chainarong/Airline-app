# Airline-app
This project is part of DES427-Mobile Dev App 

## Installation Guide
1. `cd ./app`
2. `npm install`
3. Create `.env` file in `app/` and request **API_KEY** from @gus
4. Create `env.d.ts` file in `app/` and paste this
```
declare module '@env' {
    export const API_KEY: string, test: string;
}
```

[Optional if it doesn't work]
1. `npm install firebase react-native-dotenv @react-navigation/native @react-navigation/stack @egjs/hammerjs @react-navigation/bottom-tabs`
2. `npm install -D @types/react-native-dotenv`
3. `npx expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

