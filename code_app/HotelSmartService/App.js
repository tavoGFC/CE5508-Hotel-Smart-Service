import { createAppContainer, createStackNavigator } from 'react-navigation';

import LogIn from './src/screens/login';
import Home from './src/screens/home';

const AppStack = createStackNavigator({
  Home: { screen: Home },
  LogIn: { screen: LogIn, navigationOptions: { headerBackTitle: 'Atrás' }}
});

const App = createAppContainer(AppStack);

export default App;
