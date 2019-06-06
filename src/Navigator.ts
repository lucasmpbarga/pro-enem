import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';

const Navigator = createStackNavigator({
    Login: LoginView,
    Profile: ProfileView
},
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(Navigator);