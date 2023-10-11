import { Dimensions, StyleSheet} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const commonStyles = StyleSheet.create({
  body: {
    color: 'white',
  },

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  topbar: {
    backgroundColor: 'transparent',
  },

  title: {
    fontFamily: 'SF-Pro',
    fontSize: 32,
    color: '#FFF',

    marginTop: '2%',
  },

  content: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  heading: {
    color: '#fff',
    fontFamily: 'SF-Pro',
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
  },

  subheading: {
    color: '#979797',
    fontFamily: 'SF-Pro',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },

  button: {
    width: '75%',
    color: '#FFFFFF',
    borderRadius: 16,
    padding: '5%',
    backgroundColor: '#48C9B0',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'SF-Pro',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: '-11.7%',
    marginLeft: '2%',
  },
});

export default commonStyles;