/**
 * import libraries
 */
import React, { Component } from 'react';
import { Image, Animated } from 'react-native';
import { Container, Footer, List, ListItem, Button, Icon, Text, Content, CardItem, Card, Left, Body, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import HomeButton from './HomeButton';

/**
* This component renders the initial screen
* and it's buttons. Each of the buttons opens
* a separate view via router flux
*/
class AnimatedHome extends Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    size: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 500
      }),
      Animated.spring(this.state.size, {
          toValue: 84,
          duration: 1200,
          bounciness: 25
      })
  ]).start();
  }

   render() {
    const { buttonStyle, iconStyle, buttonTextstyle, } = styles;
    const { fadeAnim, size } = this.state;

    return (
      <Container>
        <Animated.Image source={require('../Images/burgersplash.jpg')} resizeMode='cover' style={{ opacity: fadeAnim, flex: 1, width: null, height: null }}>
          <Card style={{ justifyContent: 'center', backgroundColor: 'none' }}>
              <Animated.View style={{ width: size * 2, height: size }}>
                <CardItem style={{ backgroundColor: 'none' }}>  
                  <HomeButton iconName='md-locate' onPress={() => setTimeout(() => Actions.nearby({}), 350)}>
                      Бургери во Близина
                  </HomeButton>
                </CardItem>
              </Animated.View>
              <Animated.View style={{ width: size * 2, height: size }}>
                <CardItem style={{ backgroundColor: 'none' }}>  
                  <HomeButton iconName='md-globe' onPress={() => setTimeout(() => Actions.all({}), 350)}>
                    Бургери во Скопје
                  </HomeButton>
                </CardItem>
              </Animated.View>
              <Animated.View style={{width: size * 2, height: size }}>
                <CardItem style={{ backgroundColor: 'none' }}>
                  <HomeButton iconName='md-list' onPress={() => setTimeout(() => Actions.placelist({}), 350)}>
                    Листа на локали
                  </HomeButton>
                </CardItem>
            </Animated.View>
          </Card>  
        </Animated.Image>      
     </Container>
     );
   }
 }; 

 /**
  * object containing the stylings
  */
const styles = {
  pressedButtonStyle: {
    flex: 1, 
    margin: 1, 
    borderColor: '#c44a2c',
    backgroundColor: 'rgba(56, 56, 56, 0.8)',
    justifyContent: 'center',

  },
  buttonStyle: { 
    flex: 1, 
    margin: 1, 
    borderColor: '#c44a2c',
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
    justifyContent: 'center',
  },
  pressedIconStyle: {
    color: 'white',
    size: 29
  },
  iconStyle: { 
    color: '#1f1f1f', 
    size: 29 
  },
  pressedButtonTextStyle: {
    color: 'white'
  },
  buttonTextstyle: { 
    color: 'd3d3d3' 
  }
};

export default AnimatedHome;
