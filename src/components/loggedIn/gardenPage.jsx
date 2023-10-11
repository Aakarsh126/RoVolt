import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from './../../../styles';
import axios from 'axios';
import ChartModal from './charts';
import EventsCarousel from './eventsCarousel';

const windowHeight = Dimensions.get('window').height;
import BASE_URL from '../../const';
const Garden = ({navigation}) => {
  const [chartModalVisible, setChartModalVisible] = useState(false);
  const xData = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
  const yData = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400];
  
  const toggleChartModal = () => {
    setChartModalVisible(!chartModalVisible);
  };
  const [suggestions, setSuggestions] = useState(
   [
    {
      navigate: 'Garden',
      name: 'Top suggestion',
      color: '#C7FFD6',
      details: 'Move to a brightly lit environment',
      image:
        'https://res.cloudinary.com/dcrfpsiiq/image/upload/v1678125002/Activity_uw71pf.png',
      icon:'message-circle',
      others: 'Sunlight is low'
    },
    {
      navigate: 'Garden',
      name: 'Last watered', 
      color: '#FFC7F9',
      details: 'At this time',
      others: 'For this long',
      image:
        'https://res.cloudinary.com/dcrfpsiiq/image/upload/v1678125075/Arrow_qgmwic.png',
      icon:'clock'
    },
    {
      navigate: 'Modal1',
      name: 'Rover movements',
      color: '#87C4FF',
      details: 'Navigate arm using touch controls',
      others:  'Navigate arm movements',
      image:
        'https://res.cloudinary.com/dcrfpsiiq/image/upload/v1678125032/Wallet_eriqpx.png',
      icon:'play'
    },
    {
      navigate: 'Modal2',
      name: 'Photo',
      color: '#87C4FF',
      details: 'Change display of screen',
      others:  '',
      image:
        'https://unsplash.com/photos/mG28olYFgHI',
      icon:'play'
    } 
      // {},
      // {}
    ])
  const [isPlant, setIsPlant] = useState(false);
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(65);
  const [sunlight, setSunlight] = useState(70);
  const [soilMoisture, setSoilMoisture] = useState(45);
  useEffect(() => {
    async function  getValues()
    {
      const token = await AsyncStorage.getItem('token')
      console
      const headers = {
        Authorization: token, // Replace token with your actual token value
        'Content-Type': 'application/json'
      };
      let response;
      try {
        response = await axios.get(BASE_URL + '/get/sensor', { headers })
        setIsPlant(true);
      }
      catch(e)
      {
        console.log(e)
        setIsPlant(false)
        return;
      }
      if(response.data) {
      // console.log(response.data)
      const latestRecord = response.data.records;
      setTemperature(latestRecord.temperature);
      setHumidity(latestRecord.humidity);
      setSunlight(latestRecord.sunlight);
      setSoilMoisture(Math.abs(latestRecord.soil_moisture));
      }
    }
    const intervalId = setInterval(() => {
      getValues()
    }, 2000);
    return () => clearInterval(intervalId);
  }, [])
  const tilesData = [
    {
      title: 'Temperature',
      value: `${temperature} °C`,
      color: '#43364E',
    },
    {
      title: 'Humidity',
      value: `${humidity}%`,
      color: '#2E405A',
    },
    {
      title: 'Sunlight',
      value: `${sunlight} Lux`,
      color: '#5C5413',
    },
    {
      title: 'Soil Moisture',
      value: `${soilMoisture}%`,
      color: '#31443A',
    },
  ];

  const renderTile = (tileData) => {
    return (
      <TouchableOpacity
        key={tileData.title}
        style={[styles.tile, { backgroundColor: tileData.color }]}
      >
        <Text style={styles.tileTitle}>{tileData.title}</Text>
        <Text style={styles.tileValue}>{tileData.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.topbar}>
        <Text style={commonStyles.title}>Garden</Text>
      </View>
      <View style={styles.headingContainer}>
        <Text style={commonStyles.heading}>Garden Data</Text>
      </View>
      <View style={commonStyles.container}>
      {/* <TouchableOpacity style={commonStyles.button} onPress={toggleChartModal}>
        <Text style={commonStyles.buttonText}>Open Chart</Text>
      </TouchableOpacity> */}
      <ChartModal visible={chartModalVisible} xData={xData} yData={yData} closeModal={toggleChartModal} />
    </View>
     <EventsCarousel images={suggestions} navigation={navigation} />
      {(isPlant)?<View>
        <View style={styles.tilesContainer}>
        
        {tilesData.map((tileData, index) => {
          if (index % 2 === 0) {
            return (
              <View key={`row-${index}`} style={styles.tilesRow}>
                {renderTile(tileData)}
                {index + 1 < tilesData.length && renderTile(tilesData[index + 1])}
              </View>
            );
          }
          return null;
        })}
   
      </View>
      
      <View style = {{marginBottom: 100, marginTop: 25}}>
     
      </View>

        </View>
        :
      
        <View><Text style = {[commonStyles.heading, {marginTop: 30}]}>Add Sensor to view this page</Text></View>
      }
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tilesContainer: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tile: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  tileValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Garden;
