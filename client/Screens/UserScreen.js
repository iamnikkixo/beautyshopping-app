import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import { Icon, Avatar, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as SecureStore from 'expo-secure-store';

const UserScreen = ({ navigation }) => {
  const [avatarSource, setAvatarSource] = useState(null);
  const firstName = useSelector((state) => state.auth.user.firstName);
  const lastName = useSelector((state) => state.auth.user.lastName);

  const getImageFromGallery = async () => {
    const mediaLibraryPermissions =
      await ImagePicker.requestCameraPermissionsAsync();

    if (mediaLibraryPermissions.status === 'granted') {
      const capturedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      processImage(capturedImage.assets[0].uri);
    }
    // navigate to Login Screen
    navigation.navigate('login');
  };

  const processImage = async (imgUri) => {
    const processedImage = await ImageManipulator.manipulateAsync(
      imgUri,
      [{ resize: { height: 400, width: 400 } }],
      { format: 'png' }
    );
    setAvatarSource(processedImage.uri);
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('expirationTime');
    navigation.navigate('login');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 18,
        paddingVertical: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.green}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>My Profile</Text>
        <View style={{ width: 25 }} />
      </View>
      <View style={styles.profileImageContainer}>
        <Avatar
          size={120}
          rounded
          icon={avatarSource ? null : { type: 'ionicon', name: 'person' }}
          source={avatarSource ? { uri: avatarSource } : null}
          onPress={getImageFromGallery}
          containerStyle={{ backgroundColor: COLORS.yellow }}
          activeOpacity={0.7}
        />
        <Text
          style={{
            fontSize: 18,
            marginTop: 10,
            fontFamily: 'Nunito-SemiBold',
          }}
        >
          {firstName} {lastName}
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          paddingHorizontal: 10,

          justifyContent: 'space-around',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Nunito-SemiBold',
            marginBottom: 7,
            color: COLORS.green,
          }}
        >
          My account
        </Text>
        <TouchableHighlight
          underlayColor="#ECECEC"
          style={styles.buttonStyle}
          onPress={() => console.log('Button pressed')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name="cog" type="ionicon" size={25} color={COLORS.green} />
            <Text style={styles.buttonText}>Account Settings</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ECECEC"
          style={styles.buttonStyle}
          onPress={() => console.log('Button pressed')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              name="cart-outline"
              type="ionicon"
              size={25}
              color={COLORS.green}
            />
            <Text style={styles.buttonText}>My Orders</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ECECEC"
          style={styles.buttonStyle}
          onPress={() => console.log('Button pressed')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              name="map-marker-outline"
              type="material-community"
              size={25}
              color={COLORS.green}
            />
            <Text style={styles.buttonText}>Shipping Address</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#ECECEC"
          style={styles.buttonStyle}
          onPress={() => console.log('Button pressed')}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              name="card-outline"
              type="ionicon"
              size={25}
              color={COLORS.green}
            />
            <Text style={styles.buttonText}>Payment Methods</Text>
          </View>
        </TouchableHighlight>
        <Button
          containerStyle={{ borderRadius: 15 }}
          buttonStyle={{ paddingVertical: 15, backgroundColor: COLORS.green }}
          titleStyle={{
            fontSize: 13,
            letterSpacing: 1.5,
            color: COLORS.white,
          }}
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 17,
    letterSpacing: 2,
    fontFamily: 'Nunito-SemiBold',
  },
  profileImageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 0.7,
    borderColor: COLORS.green,
    borderRadius: 15,
    backgroundColor: COLORS.cream,
  },
  buttonText: {
    color: COLORS.green,
    marginLeft: 15,
    fontSize: 15,
    letterSpacing: 1.5,
  },
});

export default UserScreen;
