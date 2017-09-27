import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );

const styles = {
    containerStyle: {
        padding: 8,
        backgroundColor: '#ddd',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#d3d3d3',
        position: 'relative'
    }
};

export { CardSection };
