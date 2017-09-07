import React from 'react';
import { Linking, } from 'react-native';
import { Container, Footer, ListItem, Button, Icon, Text, Content, CardItem, Left, Body, Thumbnail } from 'native-base';
import Communications from 'react-native-communications';
import { CardSection, } from './common';

/**
 * This component renders the data from the selected burger joint in the 
 * other (Nearby/All) views.
 * @param {*} props - the data recieved by react-native-router-flux
 */
const BurgerPlace = (props) => {
  const burgerPlace = props.burger;
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
      <Content>
        <Text note style={menuUnavailableStyle}>Менито не е достапно во моментов</Text>
      </Content>
      );
    }
    return menu.map(item =>
    
      <ListItem onPress={() => console.log(this.props)} key={item.menuID} style={listItemStyle} >
        <Left>
        <Thumbnail small source={require('../Images/Burger-icon-colorless.png')} />
        <Body>
        <Text style={menuItemNameStyle}>{item.itemName}</Text>
        <Text note style={menuItemIngredientsStyle}>Состoјки: {item.itemIngredients}</Text>
        </Body>
        <Text style={menuItemPriceTextStyle}>{item.itemPrice} ден.</Text>
        </Left>
      </ListItem>
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
    <Button
      rounded
      style={FBButtonStyle}
      onPress={() => { 
        return Linking.openURL(fburl);
      }}
    >
      <Icon name="logo-facebook" iconLeft />
      <Text>Facebook</Text>
    </Button>
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
      <Button
        rounded
        style={orderButtonStyle} 
        onPress={() => { 
          return Communications.phonecall(phone, true);
        }
        }
      >
        <Icon name="call" />
        <Text>Нарачка</Text>
      </Button> 
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
          <Content>
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
  },
  menuContainerStyle: { 
    flex: 4, 
    padding: 0, 
    borderBottomWidth: 1 
  },
  menuTitleContainerStyle: { 
    flex: 1, 
    flexDirection: 'column', 
    padding: 0 
  },
  headerWrapperStyle: {
    backgroundColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 1,
  },
  listItemStyle: { 
    flexDirection: 'column', 
    backgroundColor: '#ddd' 
  },
  FBButtonStyle: {
     backgroundColor: '#3B5998', 
     flex: 1, 
     justifyContent: 'center', 
     position: 'relative', 
     margin: 1 
  },
  orderButtonStyle: { 
    backgroundColor: '#5FBB3F', 
    flex: 1, 
    justifyContent: 'center', 
    position: 'relative', 
    margin: 1 
  },
  footerStyle: { 
    backgroundColor: '#ddd', 
    padding: 3 
  }
  
};

export default BurgerPlace;
