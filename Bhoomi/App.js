import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import { Provider } from 'react-redux';
import store from './src/redux/store';
import StackNavigation from './src/screens/StackNavigator';
import SignIn from './src/screens/SignIn';


export default function App() {
  return (
     <Provider store={store}>
       <StackNavigation />
     </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
