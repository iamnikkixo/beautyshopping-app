import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import useFonts from './hooks/useFonts';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './Screens/LandingScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import MainContainer from './Screens/MainContainer';
import DetailsScreen from './Screens/DetailsScreen';
import CartScreen from './Screens/CartScreen';
import CheckoutScreen from './Screens/CheckoutScreen';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigationRef = useRef(null);

  useEffect(() => {
    async function loadFonts() {
      await useFonts();
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const expirationTimeStr = await SecureStore.getItemAsync(
        'expirationTime'
      );
      if (expirationTimeStr) {
        const expirationTime = parseInt(expirationTimeStr);
        const currentTime = Date.now() / 1000; // Convert to seconds
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration > 0) {
          setTimeout(async () => {
            await SecureStore.deleteItemAsync('authToken');
            await SecureStore.deleteItemAsync('expirationTime');
            navigationRef.current?.navigate('login');
          }, timeUntilExpiration * 1000);
        } else {
          // If the token has already expired, log out immediately
          await SecureStore.deleteItemAsync('authToken');
          await SecureStore.deleteItemAsync('expirationTime');
          navigationRef.current?.navigate('login');
        }
      }
    };

    checkTokenExpiration();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={persistor}
      >
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="landing"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="landing" component={LandingScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="main" component={MainContainer} />
            <Stack.Screen name="details" component={DetailsScreen} />
            <Stack.Screen name="cart" component={CartScreen} />
            <Stack.Screen name="checkout" component={CheckoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
