import React, {Component, useEffect, useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
  TextInput
} from 'react-native';

const bg = require('./../../../assets/particle.png');
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons'; 
const windowHeight = Dimensions.get('window').height;

import BASE_URL from '../../const';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = async (email, password, username, navigation) => {
  try {
    console.log(email+username+password)
    const response = await axios.post(`${BASE_URL}/auth/register`, { email, password, username });
    if(response.status == 400) {
    console.log(response.data);
    return;
    }

    const { token } = response.data;
    
    // Store the token in AsyncStorage
    await AsyncStorage.setItem('token', token);

    // Decode the token to get the user ID
    const decoded = jwt_decode(token);
    await AsyncStorage.setItem('userId', decoded.userId)
    console.log(userId)
    navigation.navigate('Home')
    return decoded.userId;
  } catch (error) {
    console.error(error);
  }
};

const RegisterComponent = ({navigation}) => {
      const [passwordError, setPasswordError] = useState(null);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isPassValid, setIsPassValid] = useState(false);
      const [isValid, setIsValid] = useState(true);
      const [confirmPassword, setConfirmPassword] = useState('');
      const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
      const [username, setUsername] = useState('');
      const passwordValidation = (password) => {
        // Check for at least 8 characters
        const hasMinLength = /.{8,}/.test(password);
        if (!hasMinLength) {
          return {truth:false,val:'Password must be at least 8 characters long'};
        }
      
        // Check for at least one lowercase letter
        const hasLowercase = /.*[a-z].*/.test(password);
        if (!hasLowercase) {
          return {truth:false,val:'Password must contain lowercase letter(s)'};
        }
      
        // Check for at least one uppercase letter
        const hasUppercase = /.*[A-Z].*/.test(password);
        if (!hasUppercase) {
          return {truth:false,val:'Password must contain uppercase letter(s)'};
        }
      
        // Check for no spaces
        const hasNoSpaces = /^\S*$/.test(password);
        if (!hasNoSpaces) {
          return {truth:false,val:'Password cannot contain spaces'};
        }
      
        // If all requirements are met, return null
        return {truth:true, val:""};
      };
      
      const handleEmailChange = (text) => {
        setEmail(text);
        setIsValid(validateEmail(text));
      };
      
      
      const validateEmail = (text) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(text);
      };
    
      const handlePasswordChange = (text) => {
        setConfirmPasswordErrorMessage(validateConfirmPassword(confirmPassword, text))
        setPassword(text);
        setIsPassValid(validatePassword(text));
      };

      const validatePassword = (text) => {
        const { truth, val } = passwordValidation(text);
        setPasswordError(val);
        return truth;
      };

      const validateConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
          return 'Passwords do not match';
        }
      
        // If all requirements are met, return null
        return null;
      };

      const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        const error = validateConfirmPassword(password, text);
        setConfirmPasswordErrorMessage(error);
      };
    
  return (
    <SafeAreaView style={styles.bg}>
    
          <View style={styles.container}>

            <View style={styles.topbar}>
              <Text style={styles.logo}>Register</Text>
            </View>

            <Text style = {{marginTop: '20%', marginBottom: '10%', fontFamily: 'Benzin-Medium', color: 'white', fontSize: 30}}>Enter your details</Text>
            <View style={emailStyles.mainContent}>
            <View style={emailStyles.container}>
            {!isValid && (
        <Text style={emailStyles.errorText}>Please enter a valid email address</Text>
      )}
      <TextInput
        style={[emailStyles.input, !isValid && styles.inputError]}
        placeholder="Enter email"
        placeholderTextColor='white'
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={handleEmailChange}
      />
     
    </View>
    <View style={emailStyles.container}>



  <TextInput
    style={[emailStyles.input]}
    placeholder="Enter username"
    placeholderTextColor='white'
    // secureTextEntry={true}
    autoCapitalize="none"
    value={username}
    onChangeText={(text) => setUsername(text)}
  />
 
</View>
    <View style={emailStyles.container}>
    {(passwordError !== null) && (
    <Text style={emailStyles.errorText}>{passwordError}</Text>
    )}  
      <TextInput
        style={[emailStyles.input, !isPassValid && styles.inputError]}
        placeholder="Enter password"
        placeholderTextColor='white'
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={handlePasswordChange}
      />
     
    </View>
    <View style={emailStyles.container}>

    {confirmPasswordErrorMessage ? <Text style={emailStyles.errorText}>{confirmPasswordErrorMessage}</Text> : null}
  
      <TextInput
        style={[emailStyles.input, confirmPasswordErrorMessage && styles.inputError]}
        placeholder="Confirm password"
        placeholderTextColor='white'
        secureTextEntry={true}
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
     
    </View>
              <TouchableOpacity
                style={styles.button}
                  onPress = {() => register(email, password, username, navigation)}
                >
                <Feather
                  style = {styles.buttonIcon}
                  name="arrow-right"
                  size={30}
                  color="black"
         
                />
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>
            </View> 
          </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },

  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '80%',
  },

  topbar: {
    width: '100%',
    backgroundColor: 'transparent',
  },

  logo: {
    fontFamily: 'LemonMilk-Regular',
    color: '#fff',
    fontSize: 30,
    marginLeft: '8%',
    marginTop: '2%',
  },

  mainContent: {
    width: '100%',
    backgroundColor: 'transparent',
  },

  mainText: {
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 54,
    width: '100%',
    marginTop: windowHeight / 8.0,
    marginLeft: '10%',
  },

  subText: {
    color: '#979797',
    fontFamily: 'VelaSans-Medium',
    fontSize: 20,
    width: '100%',
    marginLeft: '10%',
    marginTop: '8%',
  },

  button: {
    // : 'flex-end',
    width: '75%',
    color: '#000',
    borderRadius: 15,
    // marginLeft: '12%',
    marginTop: '15%',
    padding: '5%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    marginTop: '-11.7%',
    marginLeft: '2%',
  },

  buttonIcon: {
    marginLeft: '80%',
  },

});



const emailStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    justifyContent: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -10,
  },
});


export default RegisterComponent;