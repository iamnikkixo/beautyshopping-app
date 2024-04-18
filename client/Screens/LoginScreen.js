import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
const width = Dimensions.get('window').width;
import Svg, { Path } from 'react-native-svg';
import * as SecureStore from 'expo-secure-store';
import { loginUser, resetError } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // check if authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const loginError = useSelector((state) => state.auth.error);

  // reset state error
  useEffect(() => {
    dispatch(resetError());
  }, []);

  useEffect(() => {
    if (loginError) {
      if (loginError.errorType === 'email') {
        setEmailError(loginError.message);
        setPasswordError('');
      } else if (loginError.errorType === 'password') {
        setPasswordError(loginError.message);
        setEmailError('');
      }
    }
  }, [loginError]);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateFields = () => {
    let isValid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateFields()) {
      dispatch(loginUser({ email, password }));

      if (token) {
        try {
          await SecureStore.setItemAsync('authToken', token);

          const decodedToken = jwtDecode(token);
          const expirationTime = decodedToken.exp;
          await SecureStore.setItemAsync(
            'expirationTime',
            expirationTime.toString()
          );
          navigation.navigate('main');
          setPassword('');
          setEmail('');
        } catch (error) {
          console.error('Error saving to secure storage', error);
        }
      } else {
        console.error('Login failed');
      }
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          navigation.navigate('main');
        }
      } catch (error) {
        console.error('Error retrieving data from secure storage', error);
      }
    };

    fetchToken();
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: 'http://192.168.1.7:3000/api/images/login.jpg' }}
          style={styles.image}
        >
          <Text style={styles.logoText}>Athena</Text>
          <Svg height={100} viewBox="0 0 1440 320" style={styles.svgOverlay}>
            <Path
              fill="#fff"
              d="M0,320L60,293.3C120,267,240,213,360,170.7C480,128,600,96,720,117.3C840,139,960,213,1080,213.3C1200,213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </Svg>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
          paddingVertical: 30,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.titleText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>login to your account</Text>
        </View>
        <View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="Enter Email"
              leftIcon={
                <Icon
                  name="mail"
                  type="ionicon"
                  size={24}
                  color={COLORS.grey}
                />
              }
              value={email}
              onChangeText={(text) => setEmail(text)}
              inputStyle={{ marginLeft: 7 }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                paddingHorizontal: 5,
              }}
              containerStyle={{
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                height: 55,
                paddingVertical: 3,
              }}
              errorMessage={errors.email || emailError}
            />
          </View>
          <View>
            <Input
              placeholder="Password"
              secureTextEntry={showPassword ? false : true}
              leftIcon={
                <Icon
                  name="lock-closed"
                  type="ionicon"
                  size={24}
                  color={COLORS.grey}
                />
              }
              rightIcon={
                <Icon
                  name={showPassword ? 'eye' : 'eye-off'}
                  type="ionicon"
                  size={24}
                  color={COLORS.grey}
                  onPress={() => setShowPassword((prevState) => !prevState)}
                />
              }
              value={password}
              onChangeText={(text) => setPassword(text)}
              inputStyle={{ marginLeft: 7 }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                paddingHorizontal: 5,
              }}
              containerStyle={{
                backgroundColor: '#f0f0f0',
                borderRadius: 10,
                height: 55,
                paddingVertical: 3,
              }}
              errorMessage={errors.password || passwordError}
            />
            <Pressable onPress={() => console.log('Forgot Password')}>
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: 10,
                  color: COLORS.yellow,
                  paddingVertical: 10,
                  fontFamily: 'Nunito-Bold',
                }}
              >
                Forgot Password?
              </Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Button
            title="Login"
            titleStyle={{ fontSize: 18 }}
            buttonStyle={styles.loginButton}
            onPress={handleLogin}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ textAlign: 'center' }}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('register')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.yellow,
                  fontFamily: 'Nunito-Bold',
                }}
              >
                {' '}
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    color: COLORS.green,
    fontFamily: 'Nunito-Bold',
  },
  subtitleText: {
    color: COLORS.grey,
    fontSize: 16,
    paddingVertical: 5,
    fontFamily: 'Nunito-Regular',
  },
  loginButton: {
    borderRadius: 15,
    backgroundColor: COLORS.green,
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    paddingTop: 10,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 2.5,
    textAlign: 'center',
    fontFamily: 'Nunito-Light',
  },
  svgOverlay: {
    position: 'absolute',
    bottom: 2,
    width: width,
    height: '100%',
  },
});
