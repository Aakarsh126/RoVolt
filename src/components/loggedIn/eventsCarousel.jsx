import * as React from 'react';
import {
    Modal,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
// import LinearGradient from 'expo-linear-gradient';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../const';
import { Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

class EventsCarousel extends React.Component {

  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      display: 'none',
      isUp: true,
      token: null,
      selectedIndex: 0,
      modalVisible: true,
      modal2Visible: false,
      armUp: true,
      isPressed: false,
      intervalId: null,
      image: null
    };
    this.scrollRef = React.createRef();

  }

  toggleModal = () => {
    this.setState((prevState) => ({
      modalVisible: !(prevState.modalVisible),
    }));
  };

  toggleModal2 = () => {
    this.setState((prevState) => ({
      modal2Visible: !(prevState.modal2Visible),
    }));
  };
  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('result');
       console.log('req being sent')
          fetch(`${BASE_URL}/record/rover`, {
      method: 'POST',
      headers: {
        'authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({direction:'nothing', arm: (this.state.isUp)? "up":"down", display: result.assets[0].width!=2000?"logo1":"logo2"})
    })
    .then(response => response.text())
          .then(data => {
            console.log('madarchod')
            console.log(data);
          })
          .catch(error => {
            console.error("Error: " + error);
          });
    if (!result.canceled) {
      this.setState(() => ({
      image: result.assets[0].uri,
    }));
    }
    console.log(result.assets[0])
  };

  handleArmPress = () => {
    
    const isUp = !(this.state.isUp);
    console.log(isUp)
    this.setState((prevState) => ({
      isUp: (isUp),
      display: (isUp == false)?"flex":"none"
    }))

    console.log(this.state.token);
    if (this.state.token) {
      fetch(`${BASE_URL}/record/arm`, {
        method: 'POST',
        headers: {
          'authorization': this.state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({arm:((isUp)?'up':'down')})
      })
        .then(response => response.text())
        .then(data => {
          // console.log(data);
        })
        .catch(error => {
          console.error("Error: " + error);
        });
    } else {
      console.log('Token is not set yet');
    }

    
  }
  
  handlePress = () => {

  }

  handleSeedingPress = () => {
    const isUp = (this.state.isUp);
    console.log(isUp)
    if(isUp) return;

    console.log(this.state.token);
    if (this.state.token) {
      fetch(`${BASE_URL}/record/arm`, {
        method: 'POST',
        headers: {
          'authorization': this.state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({seed:true, arm:'down'})
      })
        .then(response => response.text())
        .then(data => {
          // console.log(data);
        })
        .catch(error => {
          console.error("Error: " + error);
        });

    } else {
      console.log('Token is not set yet');
    }

  }

  onPressInHandler = async (direction) => {
        const isUp = (this.state.isUp);
console.log(isUp)
    const intervalId = setInterval(() => {
      console.log(this.state.token);
      if (this.state.token) {
        console.log('gaand')
        fetch(`${BASE_URL}/record/rover`, {
          method: 'POST',
          headers: {
            'authorization': this.state.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({direction:direction, arm: (isUp)? "up":"down"})
        })
          .then(response => response.text())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error("Error: " + error);
          });
      } else {
        console.log('Token is not set yet');
      }
    }, 200);
  
    this.setState({ isPressed: true, intervalId });
  }
  onPressOutHandler = () => {
    clearInterval(this.state.intervalId);
    fetch(`${BASE_URL}/record/rover`, {
      method: 'POST',
      headers: {
        'authorization': this.state.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({direction:'nothing', arm: (this.state.isUp)? "up":"down"})
    })
      .then(response => response.text())
      .then(data => {
        // console.log(data);
      })
      .catch(error => {
        console.error("Error: " + error);
      });
    this.setState({ isPressed: false, intervalId: null });
  }

  componentDidMount = () => {
    
    // setInterval(() => {
    //   this.setState(
    //     prev => ({
    //       selectedIndex:
    //         prev.selectedIndex === this.props.images.length - 1
    //           ? 0
    //           : prev.selectedIndex + 1,
    //     }),
    //     () => {
    //       this.scrollRef.current.scrollTo({
    //         animated: true,
    //         x: (DEVICE_WIDTH / 1.6) * this.state.selectedIndex,
    //         y: 0,
    //       });
    //     },
    //   );
    // }, 3000);
    this.getDataFromStorage();
  };

  getDataFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('token');
      console.log(data)
      if (data !== null) {
        this.setState({ token: data });
      }
    } catch (error) {
      console.error(error);
    }
  }
  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({selectedIndex});
  };

  render(navigation) {
    const { isPressed, isUp } = this.state;
    const { modalVisible, modal2Visible } = this.state;

    const {images} = this.props;
    const {selectedIndex} = this.state;
    return (
      <View
        style={{
          height: '100%',
          flexDirection: 'row',
          width: '95%',
          height: 300,
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginLeft: 15,
        }}>
        <ScrollView
          horizontal
          pagingEnabled
          //onMomentumScrollEnd={this.setSelectedIndex}
          >
          {images.map(image => (
            // <View>
            // <Image
            //   style={styles.backgroundImage}
            //   source={require(`./img/${'derivex'}.png`)}
            // //   key={image}
            // />
            // <Text style = {{color: 'white'}}>{image.name}</Text>
            // </View
            <TouchableOpacity
            
              style={styles.depWith}
              onPress={() => {

                  if(image.navigate == 'Modal1')
                  {
                    
                    this.toggleModal()
                  }
                  if(image.navigate == 'Modal2')
                    this.pickImage()
              }}>
              <LinearGradient
                colors={['#1D2426', '#272727', '#383838']}
                useAngle
                angle={45}
                angleCenter={{x: 0.5, y: 0.5}}
                style={
                    [styles.remmitex, {borderColor: image.color}]
                }>
                {/* <Image
                  source={{
                    uri: image.image,
                  }}
                  style={{
                    marginTop: '5%',
                    width: 165,
                    height: 165,
                  }}
                /> */}
                    <Feather style={{
                    marginTop: '15%',
                    
                  }}
                  name={image.icon} size={50} color={image.color} />
                <Text style={styles.amountText}>{image.name}</Text>
                <Text style={styles.amountText3}>{image.details}</Text>
                <Text style={styles.amountText2}>{image.others}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* <View style={styles.circleDiv}>
          {images.map((image, i) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: i === selectedIndex ? 0.5 : 1 }
              ]}
              key={image}
              active={i === selectedIndex}
            />
          ))}
        </View> */}
          <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={this.toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Movement Control</Text>
              <TouchableOpacity
                onPress={() => {
                console.log('I am not stupid')    
                this.toggleModal()}}
                style={styles.modalCloseButton}
              >
                <Feather name="x" size={25} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.directionButton}
                onPressIn={() => this.onPressInHandler('forward')}
                onPressOut={this.onPressOutHandler}
                onPress={() => this.handlePress('forward')}
              >
                <Feather
                  style={styles.directionButtonIcon}
                  name="arrow-up-circle"
                  size={50}
                  color="black"
                />
                {/* <Text style={styles.directionButtonText}>Forward</Text> */}
              </TouchableOpacity>
              <View style={styles.horizontalButtonsContainer}>
                <TouchableOpacity
                onPressIn={() => this.onPressInHandler('left')}
                onPressOut={this.onPressOutHandler}
                  style={styles.directionButton}
                  onPress={() => this.handlePress('left')}
                >
                  <Feather
                    style={styles.directionButtonIcon}
                    name="arrow-left-circle"
                    size={50}
                    color="black"
                  />
                  {/* <Text style={styles.directionButtonText}>Left</Text> */}
                </TouchableOpacity>
                <TouchableOpacity
                onPressIn={() => this.onPressInHandler('right')}
                onPressOut={this.onPressOutHandler}
                  style={styles.directionButton}
                  onPress={() => this.handlePress('right')}
                >
                  <Feather
                    style={styles.directionButtonIcon}
                    name="arrow-right-circle"
                    size={50}
                    color="black"
                  />
                  {/* <Text style={styles.directionButtonText}>Right</Text> */}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
              onPressIn={() => this.onPressInHandler('backward')}
              onPressOut={this.onPressOutHandler}
                style={styles.directionButton}
                onPress={() => this.handlePress('backward')}
              >
                <Feather
                  style={styles.directionButtonIcon}
                  name="arrow-down-circle"
                  size={50}
                  color="black"
                />
                {/* <Text style={styles.directionButtonText}>Backward</Text> */}
              </TouchableOpacity>
            </View>
            <Text style={[styles.modalTitle, {marginTop: 40, marginBottom: 20}]}>Arm control</Text>

            <View style={[styles.modalBody, {marginTop: 10}]}>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={this.handleArmPress}
              >
                <Feather
                  style={styles.directionButtonIcon}
                  name={isUp?"arrow-down":"arrow-up"}
                  size={50}
                  color="black"
                />
                {/* <Text style={styles.directionButtonText}>Forward</Text> */}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.directionButton, {marginTop: 20, display: this.state.display}]}
                onPress={this.handleSeedingPress}
              >
                <Feather
                  style={styles.directionButtonIcon}
                  name="anchor"
                  size={50}
                  color="black"
                />
                {/* <Text style={styles.directionButtonText}>Forward</Text> */}
              </TouchableOpacity>
              <View style={styles.horizontalButtonsContainer}>

              </View>

            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modal2Visible}
          onRequestClose={this.toggleModal2}
        >
          <ImagePickerExample />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    // height: "100%",
    // width: Dimensions.get("window").width
  },
  circleDiv: {
    // position: 'absolute',
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },

  depWith: {
    flexDirection: 'row', 
    width: DEVICE_WIDTH / 1.6,
    // borderRadius: 20,
    marginRight: 30,
  },

  derivex: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    borderWidth: 2,
    borderColor: '#C7FFD6',
  },

  sabex: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    borderWidth: 2,
    borderColor: '#87C4FF',
  },

  remmitex: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    borderWidth: 2,
    // borderColor: '#FFC7F9',
  },

  amountText: {
    fontFamily: 'VelaSans-Bold',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 18,
    alignSelf: 'flex-start',
    color: '#FFFFFF',
  },
  amountText3: {
    fontFamily: 'VelaSans-Bold',
    marginLeft: 20,
    // marginTop: 20,
    fontSize: 20,

    alignSelf: 'flex-start',
    color: 'grey',
  },

  amountText2: {
    fontFamily: 'VelaSans-Bold',
    marginTop: 15,
    marginLeft: 20,
    fontSize: 18,
    alignSelf: 'flex-start',
    color: '#FFFFFF',
  },
  toggleButton: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  toggleButtonIcon: {
    marginRight: 10,
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    
    padding: 10,
  },
  modalBody: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    // marginBottom: 20,
  },
  directionButtonIcon: {
    // marginBottom: 10,
  },
  directionButtonText: {
    color: 'black',
    fontSize: 0,
  },
  horizontalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});


 function ImagePickerExample() {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    const token = await AsyncStorage.getItem('token');
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    
      console.log('req being sent')
          fetch(`${BASE_URL}/record/rover`, {
      method: 'POST',
      headers: {
        'authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({direction:'nothing', arm: (this.state.isUp)? "up":"down", display: "logo2"})
    })
    .then(response => response.text())
          .then(data => {
            // console.log('madarchod')
            // console.log(data);
          })
          .catch(error => {
            console.error("Error: " + error);
          });
    

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

export default EventsCarousel;
