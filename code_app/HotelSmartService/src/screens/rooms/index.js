import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Button, Card, Divider, Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import { ImagePicker, Permissions } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';


import { strings } from '../../components/translator/context';



export default class Room extends React.Component {
  static navigationOptions = {
    title: 'Rooms'
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    return fetch('https://upllz8n9.api.sanity.io/v1/data/query/hss?query=*%5B_type%20%3D%3D%20%22post%22%5D%7Btitle%2C%20mainImage%7Basset%7B_ref%7D%7D%2C%20%22body%22%3A%20body%5B%5D%7B%22children%22%3Achildren%5B%5D%7D%7D')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != '') {
          const data = responseJson.result.map(function (item, index) {
            return {
              key: index,
              type: item.title,
              info: item.body.map(function (iBody, index) {
                const _info = iBody.children.map(function (item_c, index) {
                  return item_c['text']
                })
                return _info.toString();
              }).toString(),
              image: item.mainImage.asset._ref
            };
          });
          this.setState({
            dataSource: data
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _keyExtractor = (item, index) => index.toString()


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={() => this.componentDidMount()}
              />
            }>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={this._keyExtractor}
              renderItem={({ item, index }) => (
                <Card containerStyle={styles.card}
                  title={`Tipo ${item.type}`} key={index}  
                  image={{ uri: 'https://cdn.sanity.io/images/upllz8n9/hss/' + item.image.substr(item.image.indexOf('image-') + 6).replace('-jpg', ".jpg") }}>
                  <Text style={styles.info}>{item.info}</Text>
                </Card>
              )}
              numColumns={1}
            />
          </ScrollView>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
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
  info: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify'
  },
  image: {
    resizeMode: 'contain',
    alignItems: 'center',
    height: '80%',
    width: '80%'
  },
  flowRight: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 5
  }
});
