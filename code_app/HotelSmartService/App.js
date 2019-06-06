import { createAppContainer, createStackNavigator } from 'react-navigation';

import LogIn from './src/screens/login';
import Home from './src/screens/home';
import Comment from './src/screens/comments';
import Weather from './src/components/weather';

const AppStack = createStackNavigator({
  Home: { screen: Home },
  LogIn: { screen: LogIn, navigationOptions: { headerBackTitle: 'Atrás' } },
  Comment: { screen: Comment },
  Weather: { screen: Weather }
});

const App = createAppContainer(AppStack);

export default App;
