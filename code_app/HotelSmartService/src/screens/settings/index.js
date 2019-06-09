import React from 'react';
import {
  ActivityIndicator, RefreshControl,
  ScrollView, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, FlatList, Alert, PixelRatio, TextInput
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { strings, setLocale } from '../../components/translator/context';


export default class Setting extends React.Component {
  static navigationOptions = {
    title: 'Settings Hotel Smart Service'
  };

  constructor(props) {
    super(props);

    this.state = {
      options: [
        { key: '1', option: strings('settings.language'), icon: 'language' },
        { key: '2', option: strings('settings.account'), icon: 'user' },
        { key: '3', option: strings('settings.about'), icon: 'info-circle' },
        { key: '4', option: strings('settings.report'), icon: 'exclamation-triangle' }
      ]
    };
  }

  _selectOption(item) {
    switch (item) {
      case 1:
        setLocale('es');
      case 2:
        console.log('abrir cuenta');
      case 3:
        console.log('abrir acerca');
      case 4:
        console.log('informar un problema');
    }

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  };

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      onPress={this._selectOption.bind(this, item.key)}
      activeScale={0.95}
      title={item.option}
      leftIcon={{ name: item.icon, type: 'font-awesome' }}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.options}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
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
    backgroundColor: '#edfbfc',
    borderWidth: 0,
    borderRadius: 20
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: '10%'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '2%'
  },
  comment: {
    color: 'black',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  image: {
    resizeMode: 'contain',
    alignItems: 'center',
    height: '80%',
    width: '80%'
  },
  inputComment: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#000000',
    fontSize: 18,
    height: 36,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10,
    padding: 1,
    paddingBottom: 6,
    textAlign: 'center',
    width: '60%'
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
  flowRight: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 5
  },
  newComment: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  cardNewComment: {
    backgroundColor: '#edfbfc',
    borderRadius: 2,
    borderWidth: 0,
    padding: 0
  },
  newImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '50%'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
});
