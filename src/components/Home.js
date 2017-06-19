import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';
import LocalImage from './LocalImage';

 const Home = () => (
    <View style={{ flex: 1 }}>
      <CardSection style={styles.imageContainerStyle}>
          <LocalImage originalWidth={583} originalHeight={888} source={require('../Images/BurgerInitial.jpg')} />
      </CardSection>
      <CardSection style={styles.buttonContainerStyle}>
          <Button onPress={() => Actions.nearby({})}>Бургери во Близина</Button>
          <Button onPress={() => Actions.all({})}>Бургери Скопје</Button>
       </CardSection>
   </View>
  ); 

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
