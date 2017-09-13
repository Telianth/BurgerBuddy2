/**
 * import libraries
 */
import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import MapView from 'react-native-maps';

/**
 * this component renders a Map view
 * that contains all data from the API 
 */
const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.2092;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

class AllMap extends Component {
    /**
     * initial state of the component.
     */
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

    /**
     * Watch for the user's position
     */
    watchID: ?number = null;

    /**
     * http request to an external API before the component is rendered
     * The state of the component is then updated with the recieved data
     */
    componentWillMount() {
        axios.get('https://api.myjson.com/bins/14b53h')
        .then(response => this.setState({ burgers: response.data }));
    }  

    /**
     * determining the users position via device's GPS once the component is mounted
     * @param {string} positon - latitude and longitude coordnates
     */
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
            
            /**
             * Updating the state of the user's position with the new data
             */
            this.setState({ markerPosition: initialRegion });
        },
        /**
        * Error handling and additonal locator's parameters
        */ 
        (error) => alert(JSON.stringify(error), Actions.home({ type: 'reset' })),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 100 });

        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const long = parseFloat(position.coords.longitude);

            const lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };

        /**
        * updating the state with the user' new location
        */
            this.setState({ markerPosition: lastRegion });
        });
    }
    
    /**
     * clearing the location watch when the component is not in use
     */
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    /**
     * Helper method that renders the markers on the map loaded from the API
     * @param {object} item - single burger joint loaded from the API to be rendered
     * Tapping on the marker leads to a new view (BurgerPlace.js) containing additional data 
     */
     renderMarkers() {
         return this.state.burgers.map(item =>
             <MapView.Marker 
             key={item.id}
             coordinate={item.latlng}
             image={require('../Images/BurgerIcon2.png')}
             >
                <MapView.Callout 
                 tooltip
                 onPress={() => Actions.burgerplace({ item, title: item.title, })}
                >
                    <View style={styles.mapCalloutStyle}>
                        <Text style={styles.calloutTitleStyle}>{item.title}</Text>
                        <Text style={styles.calloutWorkHoursStyle}>Работи: {item.open}</Text>
                       <Text style={styles.calloutAdressStyle}>Адреса: {item.adress}</Text>
                        <View>
                          <Text style={styles.readMoreStyle}>Дознај повеќе...</Text>
                        </View>
                    </View>
                </MapView.Callout>
             </MapView.Marker>);
    }    

    /**
     * rendering Markers on screen
     */
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

/**
  * object containing the stylings
  */
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
        backgroundColor: 'rgba(241, 136, 5, 0.5)', 
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
        color: 'rgba(200, 70, 48, 1)',
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 15,
        paddingBottom: 5,
        paddingRight: 5,
    }
};

export default AllMap;
