import { createAppContainer, createStackNavigator } from 'react-navigation';

import LogIn from './src/screens/login';
import Home from './src/screens/home';
import Comment from './src/screens/comments';
import Weather from './src/components/weather';
import Setting from './src/screens/settings';
import Contact from './src/screens/contact';
import Room from './src/screens/rooms';
import Hotel from './src/screens/hotel';

const AppStack = createStackNavigator({
  Home: { screen: Home },
  LogIn: { screen: LogIn, navigationOptions: { headerBackTitle: 'Atrás' } },
  Comment: { screen: Comment },
  Weather: { screen: Weather },
  Setting: { screen: Setting },
  Contact: { screen: Contact },
  Room: { screen: Room },
  Hotel: { screen: Hotel }
});

const App = createAppContainer(AppStack);

export default App;
