/**
 * import libraries
 */
import React, { Component } from 'react';
import { Dimensions, View, Text, } from 'react-native';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

/**
* This component renders Map view with locations
* within 1km of the user's position.
*/
const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

class NearbyMap extends Component {
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

        circleCenter: {
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
             * Updating the state with the new data
             */
            this.setState({ initialPosition: initialRegion });
            this.setState({ markerPosition: initialRegion });
            this.setState({ circleCenter: initialRegion });
        }, 
        /**
         * Error handling and additonal locator's parameters
         */
        (error) => alert(JSON.stringify(error), Actions.home({ type: 'reset' })),
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 1000 });

        /**
         * updating the state with the user' new location
         */
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const long = parseFloat(position.coords.longitude);

            const lastRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATTITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            };
 
            this.setState({ initialPosition: lastRegion });
            this.setState({ markerPosition: lastRegion });
            this.setState({ circleCenter: lastRegion });
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
     * @param {object} burger - single burger joint loaded from the API to be rendered
     * Tapping on the marker leads to a new view (BurgerPlace.js) containing additional data 
     */
    renderMarkers() {
      return this.state.burgers.map(burger =>
       <MapView.Marker
       key={burger.id}
       coordinate={burger.latlng}
       image={require('../Images/BurgerIcon2.png')}
       >
           <MapView.Callout 
           tooltip
            onPress={() => Actions.burgerplace({ burger, title: burger.title })}
           >
             <View style={styles.mapCalloutStyle}>
                  <Text style={styles.calloutTitleStyle}>{burger.title}</Text>
                  <Text style={styles.calloutWorkHoursStyle}>Отворено: {burger.open}</Text>
                  <Text style={styles.calloutAdressStyle}>Адреса: {burger.adress}</Text>
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
            <View style={{ flex: 1 }}>
            <MapView
                style={styles.mapViewStyle}
                region={this.state.initialPosition}
            >
                    <MapView.Circle 
                    center={this.state.circleCenter} 
                    radius={1000} strokeWidth={1} 
                    fillColor='rgba(211, 211, 211, 0.4)' 
                    strokeColor='#c44a2c'
                    /> 
                    <MapView.Marker
                    coordinate={this.state.markerPosition}
                    pinColor='#d8b53e'
                    />
                   {this.renderMarkers()}
            </MapView>
            </View>
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

export default NearbyMap;
