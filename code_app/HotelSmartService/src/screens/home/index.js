import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';

import { strings } from '../../components/translator/context';

export default class Home extends React.Component {
  static navigationOptions = {
    title: strings('home.title')
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [
        { key: '1', option: strings('home.menuOptions.home'), icon: 'home' },
        { key: '2', option: strings('home.menuOptions.hotel'), icon: 'hotel' },
        { key: '3', option: strings('home.menuOptions.room-service'), icon: 'room-service' },
        { key: '8', option: strings('home.menuOptions.comment'), icon: 'comment' },
        { key: '4', option: strings('home.menuOptions.store'), icon: 'store' },
        { key: '5', option: strings('home.menuOptions.weather'), icon: 'wb-cloudy' },
        { key: '6', option: strings('home.menuOptions.zone'), icon: 'gps-fixed' },
        { key: '7', option: strings('home.menuOptions.settings'), icon: 'settings' },
        { key: '9', option: strings('home.menuOptions.contact'), icon: 'contacts' }
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
    } else if (item === '9') {
      this.props.navigation.navigate('Contact');
    } else if (item === '1') {
      this.props.navigation.navigate('Hotel');
      //this.props.navigation.navigate('Settings');
    } else if (item === '2') {
      this.props.navigation.navigate('Room');
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
    )
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '10%'
  },
  gridViewColumns: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: 100,
    justifyContent: 'center',
    margin: 2
  }
});
