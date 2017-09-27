import React from 'react';
import { Linking, } from 'react-native';
import { Container, Footer, ListItem, Button, Icon, Text, Content, CardItem, Left, Body, Thumbnail } from 'native-base';
import Communications from 'react-native-communications';
import { CardSection, } from './common';
import HomeButton from './HomeButton';
import * as Animatable from 'react-native-animatable';


/**
 * This component renders the data from the selected burger joint in the 
 * other (Nearby/All) views.
 * @param {*} props - the data recieved by react-native-router-flux
 */
const BurgerPlace = (props) => {
  const burgerPlace = props.item;
  const { open, description, fburl, menu, phone, logo, title, adress } = burgerPlace;
  const {
    headerWrapperStyle,
    listItemStyle,
    FBButtonStyle,
    orderButtonStyle,
    footerStyle,
    menuUnavailableStyle,
    titleMenuStyle,
    menuItemNameStyle,
    menuItemIngredientsStyle,
    menuItemPriceTextStyle,
    menuContainerStyle,
    menuTitleContainerStyle,
  } = styles;

  /**
   * helper method for conditional rendering of the menu of the burger joint
   * @param {array} menu - the array of menu items in the selected joint's API
  */
  const renderMenu = () => {
    if (menu.length === 0) {
      return ( 
      <Content style={{ backgroundColor: 'rgba(217, 93, 57, 0.4)' }}>
        <Animatable.View animation='bounceInUp' delay={220}>
        <Text note style={menuUnavailableStyle}>Менито не е достапно во моментов</Text>
        </Animatable.View>
      </Content>
      );
    }
    return menu.map(item =>
      <Animatable.View animation='bounceInUp' delay={220}>
      <ListItem onPress={() => console.log(props)} key={item.menuID} style={listItemStyle} >
        <Left>
        <Thumbnail small source={require('../Images/Burger-icon-color.png')} />
        <Body>
        <Text style={menuItemNameStyle}>{item.itemName}</Text>
        <Text note style={menuItemIngredientsStyle}>Состoјки: {item.itemIngredients}</Text>
        </Body>
        <Animatable.View animation='fadeInDown' delay={450}>
        <Text style={menuItemPriceTextStyle}>{item.itemPrice} ден.</Text>
        </Animatable.View>
        </Left>
      </ListItem>
      </Animatable.View>
    );
  };

/**
 * helper method for conditional rendering of the thumbnail
 * @param {string} logo -  link to the drawable logo of the selected burger joint in the API
*/
const renderThumbnail = () => {
  if (!logo) return <Thumbnail source={require('../Images/Burger-icon-color.png')} />;

    return <Thumbnail source={{ uri: logo }} />;
  };
  
/**
 * helper method for the conditional rendering of the Facebook button inside the component
 * @param {string} fburl - link to the burger joint's facebook page, if it exists the button
 * will be rendered, if nut it will return null
 * @func Linking.openURL() opens the facebook page in a browser by tapping the button
*/  
const renderFBButton = () => {
  if (!fburl) return null;
      
  return (
    <Animatable.View animation='fadeInRight' delay={400} >
    <HomeButton
      iconName='logo-facebook'
      rounded
      style={FBButtonStyle}
      onPress={() => { 
        return Linking.openURL(fburl);
      }}
    >
    Facebook
    </HomeButton>
    </Animatable.View>
      );
    };
    
/**
 * helper method for the conditional rendering of the 'Order Now' button inside the component
 * if the @param {string} phone exists, the button will be rendered, otherwise the method 
 * will return null
 * @param {string} phone - the phone number of the selected burger joint inside the API
 * @func Communactions.phonecall() calls the device's native call service and inserts the number
 */
const renderPhoneButton = () => {
  if (!phone) return null;

    return (
      <Animatable.View animation='fadeInLeft' delay={400} >
      <HomeButton
        iconName="md-call"
        rounded
        style={orderButtonStyle} 
        onPress={() => { 
          return Communications.phonecall(phone, true);
        }
        }
      >
      Нарачка
      </HomeButton>
      </Animatable.View> 
      );
  };
const renderFooter = () => {
  if (!fburl && !phone) return null;
  
  return (
    <Footer style={footerStyle}>
      {renderPhoneButton()}
      {renderFBButton()}
    </Footer>
    );
  };

  return (
    <Container>
      <CardItem style={headerWrapperStyle}>
              <Left>
                {renderThumbnail()}
                <Body>
                  <Text>{title}</Text>
                  <Text note>{description}</Text>
                  <Text note>{adress}</Text>
                  <Text note>Отворено: {open}</Text>
                </Body>
              </Left>
      </CardItem>
      <CardSection style={menuContainerStyle}>
        <CardSection style={menuTitleContainerStyle}>
        <Text style={titleMenuStyle}>Мени:</Text>
          <Content style={{ borderBottomWidth: 0 }}>
             {renderMenu()}
          </Content>
       </CardSection>
      </CardSection>
      {renderFooter()}
    </Container>
  );
};

const styles = {
  menuUnavailableStyle: {
    alignSelf: 'center'
  },
  menuItemNameStyle: { 
    fontSize: 15, 
    fontWeight: 'bold'
  },
  menuItemIngredientsStyle: { 
    fontSize: 10, 
    fontStyle: 'italic', 
    paddingTop: 4,
    paddingLeft: 3 
  },
  menuItemPriceTextStyle: { 
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17
  },
  titleMenuStyle: { 
    fontSize: 22, 
    fontWeight: 'bold',
    alignSelf: 'center', 
    borderBottomWidth: 2, 
    borderColor: '#1F1F1F',
    color: 'rgba(58, 51, 53, 1)' 
  },
  menuContainerStyle: { 
    flex: 4, 
    padding: 0, 
    
  },
  menuTitleContainerStyle: { 
    flex: 1, 
    flexDirection: 'column', 
    padding: 0,
    backgroundColor: 'rgba(228, 82, 11, 0.4)'  
  },
  headerWrapperStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'rgba(228, 82, 11, 0.7)'
  },
  listItemStyle: { 
    flexDirection: 'column',
    backgroundColor: 'none' 
  },
  FBButtonStyle: {
     flex: 1, 
     justifyContent: 'center', 
     position: 'relative', 
     margin: 1 
  },
  orderButtonStyle: { 
    flex: 1, 
    justifyContent: 'center', 
    position: 'relative', 
    margin: 1 
  },
  footerStyle: { 
    padding: 3,
    backgroundColor: 'rgba(228, 82, 11, 1)'
  }
  
};

export default BurgerPlace;
