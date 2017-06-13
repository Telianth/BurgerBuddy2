import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 8,
        backgroundColor: '#d3d3d3',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };
