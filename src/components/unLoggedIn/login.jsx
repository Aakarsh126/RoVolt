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

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../const';
export const login = async (navigation, email, password) => {
  try {
    console.log(email + " " + password)
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    const { token } = response.data;
    console.log(token)
    // Store the token in AsyncStorage
    await AsyncStorage.setItem('token', token);

    // Decode the token to get the user ID
    const decoded = jwt_decode(token);
    console.log(decoded.userId)
    await AsyncStorage.setItem('userId', decoded.userId)
    
    navigation.navigate('Garden')

    return decoded.userId;
  } catch (error) {
    console.error(error);
  }
};

const RegisterComponent = ({navigation}) => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [isValid, setIsValid] = useState(true);

      
      const handleEmailChange = (text) => {
        setEmail(text);
        setIsValid(validateEmail(text));
      };
      
      
      const validateEmail = (text) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(text);
      };
    
      const handlePasswordChange = (text) => {
        // setConfirmPasswordErrorMessage(validateConfirmPassword(confirmPassword, text))
        setPassword(text);
      };


    
  return (
    <SafeAreaView style={styles.bg}>
    
          <View style={styles.container}>

            <View style={styles.topbar}>
              <Text style={styles.logo}>Login</Text>
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
        placeholder="Enter password"
        placeholderTextColor='white'
        secureTextEntry={true}
        autoCapitalize="none"
        value={password}
        onChangeText={handlePasswordChange}
      />
     
    </View>
   
              <TouchableOpacity
                style={styles.button}
                onPress = {() => login(navigation, email, password)}
                >
                <Feather
                  style = {styles.buttonIcon}
                  name="arrow-right"
                  size={30}
                  color="black"
         
                />
                <Text style={styles.buttonText}>Sign in</Text>
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
