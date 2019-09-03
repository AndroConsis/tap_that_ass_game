/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, Component } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native';
import Timer from './Timer';

const boxDimen = 100;
const { width, height } = Dimensions.get("screen");
const maxX = width - boxDimen;
const minX = 10;
const maxY = height - boxDimen;
const minY = 100;

const imageSource = number => {
  switch (number) {
    case 1:
      return require('./assets/donkeyImage1.png');
      break;
    case 2:
      return require('./assets/donkeyImage2.png');
      break;
    case 3:
      return require('./assets/donkeyImage3.png');
      break;
    default:
      return require('./assets/donkeyImage1.png');
      break;
  }
}

class App extends Component {
  state = {
    score: 0,
    translateX: new Animated.Value((width / 2) - boxDimen / 2),
    translateY: new Animated.Value((height / 2) - boxDimen / 2),
  }

  changeXY = () => {
    Animated.parallel([
      Animated.timing(this.state.translateX, {
        toValue: Math.floor(Math.random() * (+maxX - +minX)) + +minX,
        useNativeDriver: true
      }),
      Animated.timing(this.state.translateY, {
        toValue: Math.floor(Math.random() * (+maxY - +minY)) + +minY,
        useNativeDriver: true
      })
    ]).start();
  }

  onTimeup = () => {
    Alert.alert(`${this.state.score}`, "Better luck next time", [
      {
        text: "Restart",
        onPress: () => {
          this.setState({
            score: 0,
            translateX: new Animated.Value((width / 2) - boxDimen / 2),
            translateY: new Animated.Value((height / 2) - boxDimen / 2),
          })
        }
      }
    ]);
  }

  onPress = () => {
    if (this.state.score == 0) {
      this.timerRef && this.timerRef.startTimer();
    }
    this.setState(state => state.score++);
    this.changeXY();
  }

  get boxStyle() {
    return {
      transform: [
        { translateX: this.state.translateX },
        { translateY: this.state.translateY }
      ]
    }
  }

  timerRef = {};

  render() {
    const number = Math.floor(Math.random() * (+3 - +1)) + +1;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <ImageBackground
          style={styles.imgBackground}
          resizeMode='cover'
          source={require('./assets/farm.png')}>
          <SafeAreaView>
            <Animated.View style={[styles.boxWrapper, this.boxStyle]}>
              <TouchableOpacity style={styles.box} onPressIn={this.onPress}>
                <Image style={styles.boxImage} source={imageSource(number)} resizeMode={"contain"}></Image>
                {this.state.score == 0 && <Text style={styles.boxText}>START</Text>}
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
          <Animated.Text style={styles.score}>{this.state.score}</Animated.Text>
          <Timer
            time={5}
            ref={ref => {
              this.timerRef = ref;
            }}
            onTimeup={this.onTimeup}
            style={styles.timer} />
        </ImageBackground>
      </Fragment >
    );
  }
};


const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: "gray",
    borderRadius: boxDimen / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  boxText: {
    color: "white",
    fontFamily: "Marker Felt",
    fontSize: 18
  },
  boxImage: {
    width: boxDimen,
    height: boxDimen,
  },
  boxWrapper: {
    width: boxDimen,
    height: boxDimen,
    position: "absolute",
    borderRadius: boxDimen / 2,
  },
  score: {
    position: "absolute",
    right: 20,
    top: 40,
    textAlign: "center",
    fontSize: 36,
    fontFamily: "Marker Felt"
  },
  timer: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
});

export default App;
