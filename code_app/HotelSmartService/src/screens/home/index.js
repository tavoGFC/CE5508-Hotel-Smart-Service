import React from 'react';
import {
  ActivityIndicator, RefreshControl,
  ScrollView, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, FlatList, Alert
} from 'react-native';
import { Card, Divider, Button, Icon } from 'react-native-elements';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerNavigator
} from 'react-navigation';



export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Hotel Smart Service'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataSource: [
        { key: '1', option: '+Hotel', icon: 'home' },
        { key: '2', option: 'Habitaciones', icon: 'hotel' },
        { key: '3', option: 'Servicios', icon: 'room-service' },
        { key: '8', option: 'Comentarios', icon: 'comment' },
        { key: '4', option: 'Reservas', icon: 'store' },
        { key: '5', option: 'Tiempo', icon: 'wb-cloudy' },
        { key: '6', option: '+Zona', icon: 'gps-fixed' },
        { key: '7', option: 'Configuracion', icon: 'settings' }
      ]
    };
  }

  _selectGridItem(item) {
    if (item === '8') {
      this.props.navigation.navigate('Comment');
      //Alert.alert('abriendo home')
    } else if (item === '5') {
      this.props.navigation.navigate('Weather');
      //this.props.navigation.navigate('Settings');
    } else if (item === '7') {
      this.props.navigation.navigate('Setting');
      //this.props.navigation.navigate('Settings');
    }

  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer} scrollEnabled={true}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={styles.gridViewColumns}>
                <TouchableHighlight
                  underlayColor={'#98FB98'}
                  onPress={this._selectGridItem.bind(this, item.key)}>
                  <View>
                    <Icon
                      name={item.icon}
                    />
                    <Text>{item.option}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            )}
            numColumns={2}
          />
        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#32CD32',
    borderColor: 'white',
    borderRadius: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    height: 25,
    marginBottom: '3%',
    marginTop: '3%',
    padding: 8,
    textAlign: 'center',
    width: 160
  },
  card: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: '10%',
    padding: '2%'
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 20
  },
  flowRight: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },

  description: {
    color: 'green',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center'
  },
  image: {
    height: '30%',
    resizeMode: 'contain',
    width: '60%'
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    color: '#000000',
    fontSize: 18,
    height: 36,
    justifyContent: 'space-between',
    marginRight: 5,
    marginTop: 10,
    padding: 1,
    paddingBottom: 6,
    textAlign: 'center',
    width: '60%'
  },
  /*  specific elements for certain screens */
  // logIn screen
  containerLogIn: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: '10%',
    padding: '10%'
  },
  descriptionLogIn: {
    color: 'green',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    textAlign: 'center'
  },
  imageTitle: {
    height: '35%',
    resizeMode: 'contain',
    width: '100%'
  },
  titleLogIn: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: 'center'
  },
  // signUp screen
  containerSignUp: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    padding: 30
  },
  titleSignUp: {
    fontSize: 50,
    marginBottom: 30,
    textAlign: 'center'
  },
  // homePage screen
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '10%'
  },
  imageThumbnail: {
    alignItems: 'center',
    height: 100,
    resizeMode: 'contain',
    width: 100
  },
  gridViewColumns: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: 100,
    justifyContent: 'center',
    margin: 2
  },
  // controller tab screen
  containerTabController: {
    alignItems: 'center',
    marginTop: 10,
    padding: 4
  },
  descriptionWarningController: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  // dashboard tab screen
  containerTabDashboard: {
    alignItems: 'center',
    marginTop: 10,
    padding: 30
  },
  descriptionTabDashboard: {
    color: 'green',
    fontSize: 22,
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center'
  },
  titleTabDashboard: {
    color: 'black',
    fontSize: 30,
    marginBottom: 0,
    textAlign: 'center'
  }
});
