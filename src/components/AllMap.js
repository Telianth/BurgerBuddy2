import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import data from '../Database/BurgerList.json';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.2092;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

class InitialMap extends Component {
    state = {
        initialRegion: {
            latitude: 41.9960995,
            longitude: 21.4303442,
            latitudeDelta: LATTITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        markerPosition: {
            latitude: 0,
            longitude: 0
        },
        burgers: []
    };

    watchID: ?number = null;

        componentWillMount() {
        return this.setState({ burgers: data });
    }    

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const long = parseFloat(position.coords.longitude);

            const initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
            
            this.setState({ markerPosition: initialRegion });
        }, 
        (error) => alert(JSON.stringify(error), Actions.home({ type: 'reset' })),
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 1000 });

        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const long = parseFloat(position.coords.longitude);

            const lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };

          
            this.setState({ markerPosition: lastRegion });
        });
    }
    
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

     renderMarkers() {
         return this.state.burgers.map(burger =>
             <MapView.Marker 
             key={burger.id}
             coordinate={burger.latlng}
             image={require('../Images/BurgerIcon2.png')}
             >
                <MapView.Callout 
                 tooltip
                 onPress={() => Actions.burgerplace({ burger, title: burger.title, })}
                >
                    <View style={styles.mapCalloutStyle}>
                        <Text style={styles.calloutTitleStyle}>{burger.title}</Text>
                        <Text style={styles.calloutWorkHoursStyle}>Работи: {burger.open}</Text>
                       <Text style={styles.calloutAdressStyle}>Адреса: {burger.adress}</Text>
                        <View>
                          <Text style={styles.readMoreStyle}>Дознај повеќе...</Text>
                        </View>
                    </View>
                </MapView.Callout>
             </MapView.Marker>);
    }    

    render() {
        return (

            <MapView
                style={styles.mapViewStyle}
                region={this.state.initialRegion}
            >
                    <MapView.Marker
                    coordinate={this.state.markerPosition}
                    pinColor='#d8b53e'
                    />
                    
                    {this.renderMarkers()}
            </MapView>
        );
    }
}

const styles = {
    mapViewStyle: {
        flex: 1,
        flexDirection: 'row', 
        position: 'relative',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0 
    },
    mapCalloutStyle: {
        width: 250, 
        height: 150,
        backgroundColor: 'rgba(211, 211, 211, 0.8)', 
        borderColor: '#c44a2c', 
        borderRadius: 5, 
        borderWidth: 1
    },
    calloutTitleStyle: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#181817'
    },
    calloutWorkHoursStyle: {
        flex: 1,
        paddingLeft: 5,
        color: '#181817'
    },
    calloutAdressStyle: {
        flex: 1,
        paddingLeft: 5,
        color: '#181817'
    },
    readMoreStyle: {
        color: '#c44a2c',
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 15,
        paddingBottom: 5,
        paddingRight: 5,
    }
};

export default InitialMap;
