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
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import commonStyles from './../../../styles';
const  { windowWidth } = Dimensions.get('window')
import BASE_URL from '../../const';
const RoverBatteryWidget = ({ batteryLevel }) => {

  return (
    <View style={styles.batteryWidgetContainer}>
      <Feather
        style={styles.batteryWidgetIcon}
        name="battery"
        size={40}
        color="white"
      />
      <Text style={styles.batteryWidgetText}>{batteryLevel}%</Text>
    </View>
  );
};

const SensorBatteryWidget = ({ batteryLevel }) => {

  return (
    <View style={styles.batteryWidgetContainer}>
      <Feather
        style={styles.batteryWidgetIcon}
        name="battery"
        size={40}
        color="white"
      />
      <Text style={styles.batteryWidgetText}>Connected</Text>
    </View>
  );
};
const RegisterComponent = ({ navigation }) => {
  const [roverBatteryLevel, setRoverBatteryLevel] = useState(65);
  const [sensorBatteryLevel, setSensorBatteryLevel] = useState(38);
  const [isRover, setIsRover] = useState(false);
  const [isSensorSet, setIsSensorSet] = useState(false);
  const [json, setJson] = useState({});
  const [isError, setIsError] = useState({});
  useEffect(() => {
    async function  getValues()
    {
      const token = await AsyncStorage.getItem('token')
      const headers = {
        Authorization: token, // Replace token with your actual token value
        'Content-Type': 'application/json'
      };
      let response;
      try {
        response = await axios.get(BASE_URL + '/get/sensor', { headers })
        setIsError(false);
      }
      catch(e)
      {
        setIsError(true)
        return;
      }
      if(response.data) {
        console.log(response.data)
        
        const data = response.data;

        if(data.rover)
        {
          setIsRover(true)
        }
        else 
        {
          setIsRover(false);
        }
        if(data.sensor)
        {
          setIsSensorSet(true)
        }
        else
        {
          setIsSensorSet(false);
        }



      }
    }
    const intervalId = setInterval(() => {
      getValues()
    }, 500);
    return () => clearInterval(intervalId);
  }, [])
  return (
    <SafeAreaView style={commonStyles.bg}>
      <View style={commonStyles.container}>
        <View style={styles.devicesContainer}>
          <TouchableOpacity
            style={styles.deviceButton}
            onPress={() => {}}
          >
            <Feather
              style={styles.deviceButtonIcon}
              name="truck"
              size={40}
              color="black"
            />
            <Text style={styles.deviceButtonText}>Rover</Text>
            <RoverBatteryWidget batteryLevel={roverBatteryLevel} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deviceButton}
            onPress={() => {}}
          >
            <Feather
              style={styles.deviceButtonIcon}
              name="sliders"
              size={40}
              color="black"
            />
            <Text style={styles.deviceButtonText}>Sensors</Text>
            <SensorBatteryWidget batteryLevel={sensorBatteryLevel} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[commonStyles.button, styles.startupHelpButton]}
          onPress={() => {}}
        >
          <Feather
            style={styles.startupHelpButtonIcon}
            name="help-circle"
            size={30}
            color="white"
          />
          <Text style={styles.startupHelpButtonText}>
            Need help starting up?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.button,{marginBottom: 15}]}
          onPress={() => {
            navigation.navigate('AddRover');
          }}
        >
          <Feather
            style={commonStyles.buttonIcon}
            name="arrow-right"
            size={30}
            color="black"
          />
          <Text style={commonStyles.buttonText}>Add Rover</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={commonStyles.button}
          onPress={() => {
            navigation.navigate('AddSensorSet');
          }}
        >
          <Feather
            style={commonStyles.buttonIcon}
            name="arrow-right"
            size={30}
            color="black"
          />
          <Text style={commonStyles.buttonText}>Add sensor</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  devicesContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  deviceButton: {
    backgroundColor: 'rgba(255, 239, 0, 1)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',

  },
  deviceButtonIcon: {
    marginBottom: 10,
  },
  batteryWidgetText: {
    fontSize: 20,
    fontFamily: 'Benzin-Medium'
  },
  deviceButtonText: {
    fontFamily: 'SF-Pro',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 5,
  },
  batteryWidgetIcon: {
    textAlign: 'center'
  },
  startupHelpButton: {
    width: '95%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  startupHelpButtonIcon: {
    marginRight: 10,
  },
  startupHelpButtonText: {
    fontFamily: 'SF-Pro',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default RegisterComponent;