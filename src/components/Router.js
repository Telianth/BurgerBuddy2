/**
 * import libraries
 */
import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Home from './Home';
import NearbyMap from './NearbyMap';
import AllMap from './AllMap';
import BurgerPlace from './BurgerPlace';
import PlaceList from './PlaceList';
import AnimatedHome from './AnimatedHome';

/**
 * This component is the main routing component
 * between the different views in the application
 * @prop {string} key - acts as a hook for the react-native router-flux's @func Actions.key()
 * @prop {component} component = The component which @func Actions.key() would call to execute
 * @prop {string} title - The title to be rendered in the navbar
 * @prop {string} getTitle - renders the title from the props object
 */
const RouterComponent = () => (

        <Router
         sceneStyle={{ paddingTop: 50, backgroundColor: '#ddd' }}
         navigationBarStyle={{ backgroundColor: '#ddd' }}
         titleStyle={{ color: '#181817' }}
        >
            <Scene
            initial
            key='home' 
            component={AnimatedHome} 
            title='Бургер Другарче' 
            />
            <Scene 
            key='nearby' 
            component={NearbyMap} 
            title='Бургери во Близина' 
            backButtonImage={require('../Images/left-arrow.png')}
            panHandlers={null} 
            />
            <Scene 
            key='all' 
            component={AllMap} 
            title='Бургери Скопје' 
            backButtonImage={require('../Images/left-arrow.png')}
            panHandlers={null} 
            />
            <Scene 
            key='burgerplace' 
            component={BurgerPlace} 
            getTitle={(props) => props.title} 
            backButtonImage={require('../Images/left-arrow.png')} 
            direction='vertical'
            panHandlers={null}
            />
            <Scene 
            key='placelist' 
            component={PlaceList} 
            title="Листа на Локали"
            backButtonImage={require('../Images/left-arrow.png')} 
            panHandlers={null}
            />
        </Router>
    );

export default RouterComponent;
