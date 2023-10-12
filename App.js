import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import commonStyles from './styles'

import {
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text
} from 'react-native';

import {useEffect} from 'react'

import StaticHomeScreen from './src/components/unLoggedIn/home';
import ChooseComponent from './src/components/unLoggedIn/choose';
import LoginComponent from './src/components/unLoggedIn/login';
import RegisterComponent from './src/components/unLoggedIn/register';
import DevicesComponent from './src/components/loggedIn/devicesPage';
import GardenComponent from './src/components/loggedIn/gardenPage';
import AddRoverComponent from './src/components/loggedIn/addRover';
import AddSensorSetComponent from './src/components/loggedIn/addSensor';
import Chart from './src/charts/Chart';

import BottomNavbar from './navbar';

const Stack = createNativeStackNavigator();

const bg = require('./assets/bg.png');
const particle = require('./assets/bg.png');
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Choose({navigation}) {
  return (
    <SafeAreaView>
      <ChooseComponent navigation={navigation} />
    </SafeAreaView>
  );
}

function Login({navigation}) {
  return (
    <View>
      <LoginComponent navigation={navigation} />
    </View>
  );
}

function AddRover({navigation}) {
  return (
    <View>
      <AddRoverComponent navigation={navigation} />
    </View>
  );
}

function AddSensorSet({navigation}) {
  return (
    <View>
      <AddSensorSetComponent navigation={navigation} />
    </View>
  );
}

function Register({navigation}) {
  return (
    <ScrollView style = {{backgroundColor: 'black', width: '100%', height: '100%'}}>
      <RegisterComponent navigation={navigation} />
    </ScrollView>
  );
}


function Home({navigation}) {
  return (
    <SafeAreaView>
      <StaticHomeScreen navigation={navigation} />
    </SafeAreaView>
  );
}

function Error({navigation}) {
  return (
    <ImageBackground source={particle} style={styles.bg}>
      <SafeAreaView>
        <View>
          <Text style={styles.text}>Error</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Particle')}
          />
          <Text style={styles.buttonText}>Try Again</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function GardenPage({navigation}) {
  return (
    <View style = {{backgroundColor: 'black', width: '100%', height: '100%'}}>
      <ScrollView style = {{backgroundColor: 'black', width: '100%', height: '100%'}}>
          <GardenComponent navigation={navigation} />
      </ScrollView>
      <BottomNavbar navigation={navigation} selected="Garden" />
    </View>
  );
}

function DevicesPage({navigation}) {
  return (
    <View style = {{backgroundColor: 'black', width: '100%', height: '100%'}}>
      <ScrollView style = {{backgroundColor: 'black', width: '100%', height: '100%'}}>
          <DevicesComponent navigation={navigation} />
      </ScrollView>
      <BottomNavbar navigation={navigation} selected="Devices" />
    </View>
  );
}

function Logout({navigation}) {
  return (
    <ImageBackground source={bg} style={styles.bg}>
      <SafeAreaView>
        <View>
          <ActivityIndicator
            style={styles.loader}
            color="#48C9B0"
            size="large"
          />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

import {useFonts} from 'expo-font';
import {useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Garden from './src/components/loggedIn/gardenPage';

SplashScreen.preventAutoHideAsync();

export default function App({navigation}) {

  const clearCache = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cache cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage cache:', error);
    }
  };

  const [fontsLoaded, error] = useFonts({
    'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
    'VelaSans-Medium': require('./assets/fonts/VelaSans-Medium.otf'),
    'VelaSans-Bold': require('./assets/fonts/VelaSans-Bold.otf'),
    'LemonMilk-Regular': require('./assets/fonts/LemonMilk-Regular.otf'),
    'Benzin-Medium': require('./assets/fonts/Benzin-Medium.otf'),
  });

  useEffect(() => {

    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();  
  }, [fontsLoaded]);

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{animation:"none"}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Choose"
          component={Choose}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}

        />
        <Stack.Screen
          name="Devices"
          component={DevicesPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Garden"
          component={GardenPage}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="AddRover"
          component={AddRover}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddSensorSet"
          component={AddSensorSet}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  loader: {
    marginTop: '80%',
  },

  text: {
    color: '#48C9B0',
    fontFamily: 'SF-Pro',
    fontSize: 24,
    marginTop: '5%',
    textAlign: 'center',
  },

  comingSoonText: {
    color: '#fff',
    fontFamily: 'Benzin-Medium',
    fontSize: 32,
    textAlign: 'center',
    marginTop: '60%',
  },

  button: {
    width: '50%',
    color: '#000',
    borderRadius: 10,
    marginLeft: '25%',
    marginTop: '20%',
    padding: '7%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    marginTop: '-15.5%',
    marginLeft: '38%',
  },

  walletButton: {
    width: '50%',
    color: '#000',
    borderRadius: 10,
    marginLeft: '26%',
    marginTop: '90%',
    padding: '5%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
  },

  walletButtonText: {
    color: '#000',
    fontFamily: 'VelaSans-Bold',
    fontSize: 17,
    marginTop: '-1%',
    marginLeft: '15%',
  },

  logoutext: {
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    textAlign: 'center',
  },

  logout: {
    width: '100%',
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    marginTop: '67%',
  },

  black: {
    height: windowHeight,
    backgroundColor: 'black',
  },
});