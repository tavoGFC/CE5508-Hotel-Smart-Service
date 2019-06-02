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
import { FloatingAction } from 'react-native-floating-action';


export default class Comment extends React.Component {
  static navigationOptions = {
    title: 'Hotel Smart Service'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataSource: []
    };
  }

  _SampleFunction = () => {
    Alert.alert("¡No ha iniciado sesion!");
  }

  componentDidMount() {
    this.setState({
      dataSource: [
        { key: '1', image: 'https://www.okchicas.com/wp-content/uploads/2018/05/cabello-largo-selfie-7.jpg', comment: 'home', score: 'feliz' },
        { key: '2', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/DICKSON_T_J.jpg/220px-DICKSON_T_J.jpg', comment: 'hotel', score: 'feliz' },
        { key: '3', image: 'https://thumbor.thedailymeal.com/cECKyqca3ISDyLPSkRqB0Usf2lg=/774x516/https://www.theactivetimes.com/sites/default/files/uploads/0/0-shutterstock_458757943_0.jpg', comment: 'room-service', score: 'feliz' },
        { key: '8', image: 'https://img.peru21.pe/files/ec_article_multimedia_gallery/uploads/2017/10/08/59daab0b4ba2c.jpeg', comment: 'comment', score: 'feliz' },
        { key: '4', image: 'https://i.imgur.com/zkARwEQ.jpg', comment: 'store', score: 'feliz' },
        { key: '5', image: 'https://m.media-amazon.com/images/M/MV5BMTc0MzgwMjc1MV5BMl5BanBnXkFtZTgwNjExMTE5MjE@._V1_UX182_CR0,0,182,268_AL_.jpg', comment: 'wb-cloudy', score: 'feliz' },
        { key: '6', image: 'https://www.samsung.com/global/galaxy/galaxy-a9/images/galaxy-a9_selfie_img01.jpg', comment: 'gps-fixed', score: 'feliz' },
        { key: '7', image: 'https://www.unik-science.com/img/cms/selfie-2012540_1920.jpg', comment: 'settings', score: 'feliz' }
      ]
    })
  }

  render() {
    const actions = [{
      text: 'Comentar',
      icon: require('../../../assets/chat.png'),
      name: 'add_comment',
      position: 2
    }
    ];
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;
    return (
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.container} refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.componentDidMount()} />
        }>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <Card containerStyle={styles.card}
                title={`Comment ${item.key}`} key={item.key}
                image={{ uri: item.image }}>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text>{item.score}</Text>
              </Card>
            )}
            numColumns={1}
          />
        </ScrollView>
        <FloatingAction
          iconWidth={10}
          iconHeight={10}
          actions={actions}
          onPressItem={this._SampleFunction}
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
  titleTabDashboard: {
    color: 'black',
    fontSize: 30,
    marginBottom: 0,
    textAlign: 'center'
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
  }
});
