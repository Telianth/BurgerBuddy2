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
    backgroundColor: 'rgb(56, 56, 56)',
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
    color: 'rgba(211, 211, 211, 1)',
    size: 29
  },
  iconStyle: { 
    color: '#1f1f1f', 
    size: 29 
  },
  pressedButtonTextStyle: {
    color: 'rgba(211, 211, 211, 1)'
  },
  buttonTextstyle: { 
    color: '#3f3f3f' 
  }
};


export default HomeButton;
