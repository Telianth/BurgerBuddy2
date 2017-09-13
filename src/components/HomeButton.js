import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';

class HomeButton extends Component {
  state = {
    isClicked: false,
  }

  onPressInClick() {
     this.setState({ isClicked: true });
  }

  onPressOutClick() {
     this.setState({ isClicked: false });
  }

  render() {
    const { isClicked } = this.state;
    const { iconName, children, onPress } = this.props;
    const { 
      pressedButtonStyle, 
      pressedIconStyle, 
      pressedButtonTextStyle, 
      buttonStyle, 
      buttonTextstyle, 
      iconStyle } = styles; 

    return (
      <Button
      iconLeft
      rounded
      bordered
      style={isClicked ? pressedButtonStyle : buttonStyle} 
      onPressOut={this.onPressOutClick.bind(this)} 
      onPressIn={this.onPressInClick.bind(this)} 
      onPress={onPress}
      >
        <Icon name={iconName} style={isClicked ? pressedIconStyle : iconStyle} />
        <Text style={isClicked ? pressedButtonTextStyle : buttonTextstyle}>{children}</Text>
      </Button>
    );
  }
}

const styles = {
  pressedButtonStyle: {
    flex: 1, 
    margin: 1, 
    borderColor: '#c44a2c',
    backgroundColor: 'rgba(200, 70, 48, 0.8)',
    justifyContent: 'center',

  },
  buttonStyle: { 
    flex: 1, 
    margin: 1, 
    borderColor: '#c84630',
    backgroundColor: 'rgba(241, 136, 5, 0.8)',
    justifyContent: 'center',
  },
  pressedIconStyle: {
    color: 'rgb(240, 215, 97)',
    size: 29
  },
  iconStyle: { 
    color: 'rgba(58, 51, 53, 1)', 
    size: 29 
  },
  pressedButtonTextStyle: {
    color: 'rgb(240, 215, 97)'
  },
  buttonTextstyle: { 
    color: 'rgba(58, 51, 53, 1)' 
  }
};


export default HomeButton;
