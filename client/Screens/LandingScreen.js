import React, { useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';

const LandingScreen = ({ navigation }) => {
  useEffect(() => {
    NetInfo.fetch().then((connectionInfo) => {
      Platform.OS === 'ios'
        ? Alert.alert('Initial Network Connectivity Type:', connectionInfo.type)
        : ToastAndroid.show(
            'Initial Network Connectivity Type: ' + connectionInfo.type,
            ToastAndroid.LONG
          );
    });

    const unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      handleConnectivityChange(connectionInfo);
    });
    return unsubscribeNetInfo;
  }, []);

  const handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = 'You are now connected to an active network.';
    switch (connectionInfo.type) {
      case 'none':
        connectionMsg = 'No network connection is active.';
        break;
      case 'unknown':
        connectionMsg = 'The network connection state is now unknown.';
        break;
      case 'cellular':
        connectionMsg = 'You are now connected to a cellular network.';
        break;
      case 'wifi':
        connectionMsg = 'You are now connected to a WiFi network.';
        break;
    }
    Platform.OS === 'ios'
      ? Alert.alert('Connection change:', connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  return (
    <ImageBackground
      style={styles.image}
      source={{ uri: 'http://192.168.1.7:3000/api/images/main.jpg' }}
    >
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.logoText}>Athena</Text>
        </View>
        <View>
          <Animatable.Text
            animation="fadeInDown"
            duration={2500}
            style={styles.titleText}
          >
            Unwind, Rejuvenate, Repeat.
          </Animatable.Text>
          <Text style={styles.infoText}>
            We offer a range of all-natural and plant-based products that are
            designed to help you create a luxurious spa experience at home.
          </Text>
          <Button
            type="outline"
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            title="Get Started"
            titleStyle={{ color: 'white', fontSize: 18 }}
            onPress={() => navigation.navigate('login')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 2.5,
    fontFamily: 'Nunito-Light',
  },
  titleText: {
    color: '#fff',
    fontSize: 35,
    marginBottom: 15,
    fontFamily: 'Nunito-SemiBold',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    borderRadius: 15,
  },
  buttonStyle: {
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
  },
});

export default LandingScreen;
