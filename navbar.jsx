import React from 'react';

import {View, StyleSheet, Dimensions} from 'react-native';

import {Text} from 'react-native-elements';
import {Feather} from '@expo/vector-icons'; 
import {Color} from 'react-native-elements/dist/helpers';

const windowHeight = Dimensions.get('window').height;
const selectedIcon = '#fff';
const icon = '#9D9D9D';
const BottomNavbar = ({navigation, selected}) => {
  console.log(selected)
  return (
    // <View style = {{height: windowHeight * 0.3}}>
      <View  style={[styles.container, {paddingBottom: 25}]}>
        <View
          style={styles.top}></View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={styles.navItem}>
          <Feather
              name="activity"
            //   type="feather"
              // style={selected == 'ComingSoon'?styles.selectedIcon:styles.icon}
              size={25}
              onPress={() => navigation.navigate('Garden')}
              color={selected == 'Garden'?selectedIcon:icon}
            />  
          </View>



          <View style={styles.navItem}>
            <Feather
              name="smartphone"
            //   type="feather"
              // style={selected == 'ComingSoon'?styles.selectedIcon:styles.icon}
              size={25}
              onPress={() => navigation.navigate('Devices')}
              color={selected == 'Devices'?selectedIcon:icon}
            />  
          </View>
        </View>
      </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 1,
    width: '100%',
    marginBottom: 20,
    backgroundColor: icon
  },
  container: {
    backgroundColor: '#0C0C0C',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemText: {
    fontFamily: 'VelaSans-Light',
    fontSize: 10,
    color: '#9D9D9D',
    marginTop: 4,
  },
  icon: {
    color: '#9D9D9D',
  },
  iconSelected: {
    color: '#fff'
  }
});

export default BottomNavbar;