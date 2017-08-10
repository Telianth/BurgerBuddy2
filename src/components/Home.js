import React from 'react';
import { View, Image, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

 const Home = () => {

   return (
    <View style={{ flex: 1 }}>
      <CardSection style={styles.imageContainerStyle}>
          <Image style={{ flex: 1, height: null, width: null, resizeMode: 'contain' }} source={require('../Images/BurgerInitial.png')} />
      </CardSection>
      <CardSection style={styles.buttonContainerStyle}>
          <Button onPress={() => Actions.nearby({})}>Бургери во Близина</Button>
          <Button onPress={() => Actions.all({})}>Бургери Скопје</Button>
       </CardSection>
   </View>
   );
 }; 

const styles = {
  imageContainerStyle: {
      flex: 10,
      borderBottomWidth: 0,
      alignSelf: 'center',
  },
  buttonContainerStyle: {
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderColor: '#888',
    flex: 1
  }
};

export default Home;
