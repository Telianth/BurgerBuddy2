import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import NearbyMap from './NearbyMap';
import AllMap from './AllMap';

const RouterComponent = () => (

        <Router
         sceneStyle={{ paddingTop: 50 }}
         navigationBarStyle={{ backgroundColor: '#2c3cff' }}
         titleStyle={{ color: '#fff852' }}
        >
            <Scene key='home' component={Home} title='Бургер Другарче' />
            <Scene key='nearby' component={NearbyMap} title='Бургери во Близина' />
            <Scene key='all' component={AllMap} title='Бургери Скопје' />
        </Router>
    );

export default RouterComponent;
