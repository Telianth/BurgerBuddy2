// import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// make a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
    <View style={viewStyle} >
        <Text style={textStyle}>{props.headerText}</Text>
    </View>    
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#f3f3f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 25
},
};
// make the component available for the other parts of the app
export { Header };
