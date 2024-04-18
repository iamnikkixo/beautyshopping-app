import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../assets/shared/colors/colors';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import { Button, SocialIcon, Icon, Input } from 'react-native-elements';
import { registerUser, resetError } from '../features/auth/authSlice';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // reset state error
  useEffect(() => {
    dispatch(resetError());
  }, []);

  // error variables
  const [errors, setErrors] = useState({});
  const registerError = useSelector((state) => state.auth.error);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (registerError) {
      setEmailError(registerError);
    }
  }, [registerError]);

  // validation
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validateFields = () => {
    let isValid = true;
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

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

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateFields()) {
      dispatch(registerUser({ firstName, lastName, email, password })).then(
        (action) => {
          if (action.error) {
            console.error('Registration failed:', action.error.message);
          } else {
            console.log('Registration succeeded:', action.payload);
            navigation.navigate('login');
          }
        }
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 30,
      }}
    >
      <View
        style={{
          height: 40,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Icon
          name="arrow-left"
          type="material-community"
          size={25}
          color={COLORS.grey}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
          <Text style={styles.titleText}>Register</Text>
          <Text style={styles.subtitleText}>Create your new account</Text>
        </View>
        <View
          style={{
            flexGrow: 2,

            justifyContent: 'center',
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="First Name"
              leftIcon={
                <Icon
                  name="person"
                  type="ionicon"
                  size={24}
                  color={COLORS.grey}
                />
              }
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
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
              errorMessage={errors.firstName}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="Last Name"
              leftIcon={
                <Icon
                  name="person"
                  type="ionicon"
                  size={24}
                  color={COLORS.grey}
                />
              }
              value={lastName}
              onChangeText={(text) => setLastName(text)}
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
              errorMessage={errors.lastName}
            />
          </View>
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
              onChangeText={(text) => {
                setEmail(text);
              }}
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
          <View style={{ marginBottom: 20 }}>
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
              errorMessage={errors.password}
            />
          </View>
          <View>
            <Input
              placeholder="Confirm Password"
              secureTextEntry={showConfirmPassword ? false : true}
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
                  name={showConfirmPassword ? 'eye' : 'eye-off'}
                  type="ionicon"
                  size={24}
                  color={COLORS.grey}
                  onPress={() =>
                    setShowConfirmPassword((prevState) => !prevState)
                  }
                />
              }
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
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
              errorMessage={errors.confirmPassword}
            />
          </View>
        </View>
        <View
          style={{
            flexGrow: 2,
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Button
            title="Sign Up"
            titleStyle={{ fontSize: 18 }}
            buttonStyle={styles.loginButton}
            onPress={handleRegister}
          />
        </View>
        <View
          style={{
            flexGrow: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 20,
          }}
        >
          <Text>or register with</Text>
          <View style={{ flexDirection: 'row' }}>
            <SocialIcon
              iconSize={25}
              iconType="font-awesome"
              style={{ paddingHorizontal: 10, marginHorizontal: 10 }}
              title="Google"
              type="google"
              raised
            />
            <SocialIcon
              iconSize={25}
              iconType="font-awesome"
              style={{ paddingHorizontal: 10, marginHorizontal: 10 }}
              title="Facebook"
              type="facebook"
              raised
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.yellow,
                  fontFamily: 'Nunito-Bold',
                }}
              >
                {' '}
                Log in
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  titleText: {
    fontSize: 30,
    color: COLORS.green,
    letterSpacing: 1,
    fontFamily: 'Nunito-Bold',
  },
  subtitleText: {
    color: COLORS.grey,
    fontSize: 16,
    paddingVertical: 5,
  },
  loginButton: {
    borderRadius: 15,
    backgroundColor: COLORS.green,
    paddingVertical: 10,
  },
});

export default RegisterScreen;
