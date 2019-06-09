import React from 'react';
import {
  ActivityIndicator, RefreshControl,
  ScrollView, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Text, View, FlatList, Alert, PixelRatio, TextInput
} from 'react-native';
import { Card, Divider, Button, Icon } from 'react-native-elements';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerNavigator
} from 'react-navigation';
import { FloatingAction } from 'react-native-floating-action';


import { PermissionsAndroid } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';

export default class Comment extends React.Component {
  static navigationOptions = {
    title: 'Hotel Smart Service'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      dataSource: [],
      ImageSource: null,
      isLogin: false
    };
  }


  _SampleFunction = () => {
    Alert.alert("¡Ya puede ppublicar!");
    this.setState({
      isLogin: true
    });
  }

  camPhotoTapped = async () => {
    await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    //console.log(result);
    if (!result.cancelled) {
      this.setState({ ImageSource: result.uri });
    }
  };


  selectPhotoTapped = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    //console.log(result);
    console.log(result.uri);
    console.log(result.base64.substring(0, 50));
    if (!result.cancelled) {
      this.setState({ ImageSource: result.uri });
    }
  };


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
        {this.state.isLogin ? (
          <View style={styles.newComment}>
            <Card containerStyle={styles.cardNewComment}
              title={'Agregar Comentario Nuevo'} key={1502}
              imageStyle={styles.newImage}
              image={this.state.ImageSource === null ? { uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png' } :
                { uri: this.state.ImageSource }}>
              <View style={styles.flowRight}>
                <Icon
                  size={35}
                  name='photo-library'
                  onPress={this.selectPhotoTapped.bind(this)}
                  iconStyle={{ marginLeft: '25%', marginRight: '25%' }} />
                <Icon
                  size={35}
                  name='camera-alt'
                  onPress={this.camPhotoTapped.bind(this)}
                  iconStyle={{ marginLeft: '25%', marginRight: '25%' }} />
              </View>
              <Divider style={{ backgroundColor: 'blue', marginBottom: 2 }} />
              <TextInput style={styles.inputComment} placeholder='Agrege un comentario' />
              <View style={styles.flowRight}>
                <Button
                  icon={<Icon name='close' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 2, marginTop: 4, marginRight: 2 }}
                  title='Cancelar'
                  onPress={() => {
                    this.setState({
                      isLogin: false
                    })
                  }} />
                <Button
                  icon={<Icon name='backup' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 2, marginLeft: 2, marginTop: 4 }}
                  title='Aceptar' />
              </View>
            </Card>
          </View>
        ) : null}
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
});
