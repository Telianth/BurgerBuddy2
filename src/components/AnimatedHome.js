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
    const { fadeAnim, size } = this.state;

    return (
      <Container>
        <Animated.Image source={require('../Images/burgersplash.jpg')} resizeMode='cover' style={{ opacity: fadeAnim, flex: 1, width: null, height: null }}>
          <Card style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
              <Animated.View style={{ width: size * 2, height: size }}>
                <CardItem style={{ backgroundColor: 'transparent' }}>  
                  <HomeButton iconName='md-locate' onPress={() => setTimeout(() => Actions.nearby({}), 300)}>
                      Бургери во Близина
                  </HomeButton>
                </CardItem>
              </Animated.View>
              <Animated.View style={{ width: size * 2, height: size }}>
                <CardItem style={{ backgroundColor: 'transparent' }}>  
                  <HomeButton iconName='md-globe' onPress={() => setTimeout(() => Actions.all({}), 300)}>
                    Бургери во Скопје
                  </HomeButton>
                </CardItem>
              </Animated.View>
              <Animated.View style={{ width: size * 2, height: size }}>
                <CardItem style={{ backgroundColor: 'transparent' }}>
                  <HomeButton iconName='md-list' onPress={() => setTimeout(() => Actions.placelist({}), 450)}>
                    Листа на локали
                  </HomeButton>
                </CardItem>
            </Animated.View>
          </Card>  
        </Animated.Image>      
     </Container>
     );
   }
 } 

export default AnimatedHome;
