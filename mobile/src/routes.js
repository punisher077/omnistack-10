import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const routes = createAppContainer(
    createStackNavigator({
        Main,
        Profile
    })
);

export default Routes;