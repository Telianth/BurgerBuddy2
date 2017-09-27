/**
 * import libraries
 */
import React from 'react';
import { Image, } from 'react-native';
import { Container, Footer, List, ListItem, Button, Icon, Text, Content, CardItem, Card, Left, Body, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';

/**
* This component renders the initial screen
* and it's buttons. Each of the buttons opens
* a separate view via router flux
*/
 const Home = () => {
   const { buttonStyle, iconStyle, buttonTextstyle } = styles;

   return (
    <Container>
      <Card style={{ justifyContent: 'center' }}>
          <CardItem>
          <Button iconLeft rounded bordered style={buttonStyle} onPress={() => Actions.nearby({})}> 
            <Icon name='md-locate' style={iconStyle} />
            <Text style={buttonTextstyle} >Бургери во Близина</Text>
          </Button>
          </CardItem>
          <CardItem>
          <Button iconLeft rounded bordered style={buttonStyle} onPress={() => Actions.all({})}>
            <Icon name='md-globe' style={iconStyle} />
            <Text style={buttonTextstyle}>Бургери Скопје</Text>
          </Button>
          </CardItem>
          <CardItem>
          <Button iconLeft rounded bordered style={buttonStyle} onPress={() => Actions.placelist({})}>
            <Icon name='md-list' style={iconStyle} />
            <Text style={buttonTextstyle}>Листа на локали</Text>
          </Button>
          </CardItem>
      </Card>
   </Container>
   );
 }; 

 /**
  * object containing the stylings
  */
const styles = {
  buttonStyle: { 
    flex: 1, 
    margin: 1, 
    borderColor: '#c44a2c',
    backgroundColor: 'rgba(211, 211, 211, 0.8)',
    justifyContent: 'center',
  },
  iconStyle: { 
    color: '#1f1f1f', 
    fontSize: 29 
  },
  buttonTextstyle: { 
    color: 'd3d3d3' 
  }
};

export default Home;
