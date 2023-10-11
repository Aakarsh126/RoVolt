import React, { Component, useEffect, useState } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
} from 'react-native';

import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

import commonStyles from './../../../styles';

const bg = require('./../../../assets/bg.png');
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;

const loadFonts = async () => {
  await Font.loadAsync({
    'SF-Pro': require('./../../../assets/fonts/VelaSans-Medium.otf'),
    'VelaSans-Medium': require('./../../../assets/fonts/VelaSans-Medium.otf'),
    'VelaSans-Bold': require('./../../../assets/fonts/VelaSans-Bold.otf'),
    'LemonMilk-Regular': require('./../../../assets/fonts/LemonMilk-Regular.otf'),
    'Benzin-Medium': require('./../../../assets/fonts/Benzin-Medium.otf'),
  });
};

const StaticHomeScreen = ({ navigation }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [token, setToken] = useState(null);
  
  const handleLoggedIn = () => {
    console.log(token);
    if (token !== null) {
      console.log(token);
      navigation.navigate('Garden');
    } else {
      navigation.navigate('Choose');
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        // await AsyncStorage.setItem('tokren', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGI4YjE0MTM5ZWRiNjYwMzE0ZjM3OTkiLCJpYXQiOjE2OTAyMTUzNTF9.SdWImSNIvHL32eGWbgKyA2y61OhPOVmFWpLv4VuUNgc')
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        setToken(value);
      } catch (e) {
        // error reading value
      }
    };

    const load = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };
    load();
    getData();
  }, []);

  if (!fontsLoaded) {
    return null; // Or render a custom loading component
  }

  return (
    <ImageBackground source={bg} style={commonStyles.bg} resizeMode="cover">
      <SafeAreaView>
        <ScrollView>
          <View style={[commonStyles.container, commonStyles.body, { height: windowHeight }]}>
            <View style={commonStyles.topbar}>
              <Text style={commonStyles.title}>Assisted Settlements</Text>
            </View>
            <View style={commonStyles.content}>
              <Text style={[commonStyles.heading, {fontSize: 48, marginTop: windowHeight/10.0}]}>
                Welcome to{'\n'}
                the future of{'\n'}
                extraterrestial{'\n'} navigation{'\n'}
              </Text>
          
              <TouchableOpacity style={[commonStyles.button, {marginTop: '30%'}]} onPress={handleLoggedIn}>
                <Feather style={[{marginLeft: '80%'}]} name="arrow-right" size={32} color="black" />
                <Text style={commonStyles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StaticHomeScreen;