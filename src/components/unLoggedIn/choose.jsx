import React, {useCallback} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import commonStyles from './../../../styles';

// SplashScreen.preventAutoHideAsync();
import {Icon} from 'react-native-elements';

const bg = require('./../../../assets/bg.png');
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  return (
    <ImageBackground source={bg}>
      <SafeAreaView>
        <ScrollView>
          <View style={[commonStyles.container, commonStyles.body, { height: windowHeight }]}>
            <View style={commonStyles.topbar}>
              <Text style={commonStyles.title}>Smart Garden</Text>
            </View>
            <View style={commonStyles.content}>
              <Text style={[commonStyles.heading, {fontSize: 48, marginTop: windowHeight/10.0}]}>
                Welcome to{'\n'}
                Smart Garden{'\n'}
              </Text>
              <Text style={[commonStyles.subheading, {fontSize: 28}]}>
                All your gardening{'\n'}
                needs in one place
              </Text>
              <TouchableOpacity
                style={[commonStyles.button, {marginTop: '30%'}]}
                onPress={() => navigation.navigate('Register')}>
                <Icon
                  style={[{marginLeft: '80%'}]}
                  name="arrow-right"
                  size={30}
                  color="black"
                  type="feather"
                />
                <Text style={commonStyles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[commonStyles.button, {marginTop: '5%', backgroundColor: '#9EE9D9'}]}
                onPress={() => navigation.navigate('Login')}>
                <Icon
                  style={[{marginLeft: '80%'}]}
                  name="arrow-right"
                  size={30}
                  color="black"
                  type="feather"
                />
                <Text style={commonStyles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;