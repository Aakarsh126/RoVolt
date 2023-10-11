import React, { useState, useEffect } from 'react';
import { LineChart, Grid } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://192.168.176.121';

const Chart = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function getValues() {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(BASE_URL + '/get/sensor', { headers });
      const records = response.data.records;
      const temperatureValues = records.map((record) => record.temperature);
      const humidityValues = records.map((record) => record.humidity);
      const timeStamps = records.map((record) => record.time);
      setTemperatureData(temperatureValues);
      setHumidityData(humidityValues);
      setLabels(timeStamps);
    }

    const intervalId = setInterval(() => {
      getValues();
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.9;
  const chartHeight = 200;

  const chartData = [
    {
      data: temperatureData,
      svg: { stroke: 'rgb(255, 99, 71)' },
    },
    {
      data: humidityData,
      svg: { stroke: 'rgb(134, 206, 235)' },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          style={{ width: chartWidth, height: chartHeight }}
          data={chartData}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
      </View>
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text key={index} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 10,
    color: '#333',
    transform: [{ rotate: '-60deg' }],
  },
});

export default Chart;