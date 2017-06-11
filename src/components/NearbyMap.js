import React, { Component } from 'react';
import { Dimensions, View, Text, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import data from '../Database/BurgerList.json';
import { CardSection } from './common';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATTITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

class NearbyMap extends Component {
    constructor(props) {
        super(props); 
         
         this.state = {
        initialRegion: {
            latitude: null,
            longitude: null,
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
    }

    watchID: ?number = null;    

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

            this.setState({ burgers: data });
            this.setState({ initialPosition: initialRegion });
            this.setState({ markerPosition: initialRegion });
            this.setState({ circleCenter: initialRegion });
        }, 
        (error) => alert(JSON.stringify(error), Actions.home({ type: 'reset' })),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 });

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
            onPress={() => { 
                const url = burger.url;
                if (url !== '') {
                     Linking.openURL(burger.url);
                }
                return;
               }}
           >
             <View style={styles.mapCalloutStyle}>
                  <Text style={styles.calloutTitleStyle}>{burger.title}</Text>
                  <Text style={styles.calloutWorkHoursStyle}>Отворено: {burger.open}</Text>
                  <Text style={styles.calloutDescriptionStyle}>Опис: {burger.description}</Text>
              </View>
           </MapView.Callout>
       </MapView.Marker>);
    } 

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
                    fillColor='rgba(255, 248, 82, 0.3)' 
                    strokeColor='#2c3cff'
                    /> 
                    <MapView.Marker
                    coordinate={this.state.markerPosition}
                    pinColor='#2c3cff'
                    />
                   {this.renderMarkers()}
            </MapView>
            <CardSection style={{ flex: 1, borderBottomWidth: 0, borderColor: '#fff852', borderWidth: 1 }}>
            <Text style={{ color: '#fff852' }}>Опис</Text>
            </CardSection>
            </View>
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
        width: 230, 
        height: 70,
        backgroundColor: 'rgba(255, 248, 82, 0.9)', 
        borderColor: '#2c3cff', 
        borderRadius: 5, 
        borderWidth: 1
    },
    calloutTitleStyle: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3cff'
    },
    calloutWorkHoursStyle: {
        flex: 1,
        alignSelf: 'center',
        color: '#2c3cff'
    },
    calloutDescriptionStyle: {
        flex: 1,
        alignSelf: 'center',
        color: '#2c3cff'
    }
};

export default NearbyMap;
