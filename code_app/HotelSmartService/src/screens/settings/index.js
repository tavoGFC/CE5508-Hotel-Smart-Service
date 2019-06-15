import React from 'react';
import {
  Alert,
  FlatList,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ListItem } from 'react-native-elements';

import { clearSession } from '../../components/session';
import { strings, setLocale } from '../../components/translator/context';

export default class Setting extends React.Component {
  static navigationOptions = {
    title: strings('settings.title')
  };

  constructor(props) {
    super(props);

    this.state = {
      options: [
        { key: '1', option: strings('settings.language'), icon: 'language' },
        { key: '2', option: strings('settings.account'), icon: 'user' },
        { key: '3', option: strings('settings.about'), icon: 'info-circle' },
        { key: '4', option: strings('settings.report'), icon: 'exclamation-triangle' }
      ],
      status: false,
      language: ''
    };
  }

  selectedLanguage = (lang) => {
    this.setState({ language: lang, status: !this.state.status })
    Alert.alert(
      strings('settings.alert.title'),
      strings('settings.alert.text'),
      [
        {
          text: strings('settings.alert.buttonAccept'), onPress: () => {
            setLocale(lang);
          }
        },
        {
          text: strings('settings.alert.buttonCancel'),
          onPress: () => '',
          style: 'cancel',
        }
      ],
      { cancelable: false },
    );

  }

  _renderSelectLanguage = () => {
    if (this.state.status) {
      return (
        <View style={styles.options}>
          <Picker
            selectedValue={this.state.language}
            style={{ height: '100%', width: '100%' }}
            onValueChange={this.selectedLanguage}
          >
            <Picker.Item label='English' value='en' />
            <Picker.Item label='Español' value='es' />
          </Picker>
        </View >
      );
    } else {
      return null;
    }
  }

  _selectOption(item) {
    if (item == '1') {
      this.setState({
        status: !this.state.status
      })
    } else if (item == '2') {
      Alert.alert(
        strings('settings.alertSession.title'),
        strings('settings.alertSession.message'),
        [
          {
            text: strings('settings.alertSession.buttonAccept'), onPress: () => {
              clearSession();
            }
          },
          {
            text: strings('settings.alertSession.buttonCancel'),
            onPress: () => '',
            style: 'cancel',
          }
        ],
        { cancelable: false },
      );
    } else if (item == '3') {
      console.log('3')
    } else if (item == '4') {
      console.log('4')
    }
  }

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  _keyExtractor = (item, index) => index.toString()

  _renderItem = ({ item }) => (
    <ListItem
      onPress={this._selectOption.bind(this, item.key)}
      activeScale={0.95}
      title={item.option}
      leftIcon={{ name: item.icon, type: 'font-awesome' }}
      chevron
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <View >
          {this._renderSelectLanguage()}
        </View>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.options}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: '10%'
  },
  image: {
    resizeMode: 'contain',
    alignItems: 'center',
    height: '80%',
    width: '80%'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  options: {
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
});
