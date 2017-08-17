import React from 'react';
import { Image, } from 'react-native';
import { Container, Footer, List, ListItem, Button, Icon, Text, Content, CardItem, Left, Body, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

 const Home = () => {
   const { footerStyle, buttonStyle, iconStyle, buttonTextstyle } = styles;

   return (
    <Container>
      <CardItem body style={{ flex: 10 }}>
          <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('../Images/BurgerInitial.png')} />
      </CardItem>
      <Footer style={footerStyle}>
          <Button iconLeft rounded bordered style={buttonStyle} onPress={() => Actions.nearby({})}>
            <Icon name='md-locate' style={iconStyle} />
            <Text style={buttonTextstyle} >Бургери во Близина</Text>
          </Button>
          <Button iconLeft rounded bordered style={buttonStyle} onPress={() => Actions.all({})}>
            <Icon name='md-globe' style={iconStyle} />
            <Text style={buttonTextstyle}>Бургери Скопје</Text>
          </Button>
       </Footer>
   </Container>
   );
 }; 

const styles = {
  footerStyle: { 
    backgroundColor: '#ddd', 
    padding: 3 
  },
  buttonStyle: { 
    flex: 1, 
    margin: 1, 
    borderColor: '#1f1f1f' 
  },
  iconStyle: { 
    color: '#1f1f1f', 
    size: 29 
  },
  buttonTextstyle: { 
    color: 'd3d3d3' 
  }
};

export default Home;
