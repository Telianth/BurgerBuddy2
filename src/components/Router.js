import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import NearbyMap from './NearbyMap';
import AllMap from './AllMap';
import BurgerPlace from './BurgerPlace';

const RouterComponent = () => (

        <Router
         sceneStyle={{ paddingTop: 50, backgroundColor: '#d3d3d3' }}
         navigationBarStyle={{ backgroundColor: '#d3d3d3' }}
         titleStyle={{ color: '#181817' }}
        >
            <Scene key='home' component={Home} title='Бургер Другарче' />
            <Scene 
            key='nearby' 
            component={NearbyMap} 
            title='Бургери во Близина' 
            backButtonImage={require('../Images/left-arrow.png')} 
            />
            <Scene 
            key='all' 
            component={AllMap} 
            title='Бургери Скопје' 
            backButtonImage={require('../Images/left-arrow.png')} 
            />
            <Scene 
            key='burgerplace' 
            component={BurgerPlace} 
            getTitle={(props) => props.title} 
            backButtonImage={require('../Images/left-arrow.png')} 
            direction='vertical' 
            />
        </Router>
    );

export default RouterComponent;
