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

import { isLogin, getSessionId, clearSession } from '../../components/session';
import { uploadImageAsync, getEmotions } from '../../components/google/services';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Comment extends React.Component {
  static navigationOptions = {
    title: 'Experiencia de Usuarios'
  };

  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      commentText: '',
      dataSource: [],
      imageSource: null,
      isLoading: false,
      isLogin: false,
      isUploading: false
    };
  }

  _commentOptions = (name) => {
    if (name === 'add_comment') {
      this.setState({
        isLogin: true
      });
    } else if (name === 'edit_comment') {
      console.log('vista para editar comentarios');
    }
  }

  componentDidMount() {
    return fetch('https://hsservice.azurewebsites.net/api/v1/?route=comments')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != '') {
          this.setState({
            dataSource: responseJson
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _keyExtractor = (item, index) => index.toString()

  _selectPhotoGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      base64: true
    });
    if (!result.cancelled) {
      this.setState({ imageSource: result });
    }
  };

  _takePhotoCam = async () => {
    await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true
    });
    if (!result.cancelled) {
      this.setState({ imageSource: result });
    }
  };

  _isLogin = async () => {
    const state = await isLogin();
    if (!state) {
      this.setState({ actions: [] });
      Alert.alert(
        'Aviso',
        'Debe iniciar sesion para realizar publicaciones.',
        [
          {
            text: 'Inicar sesion', onPress: () => {
              this.action.animateButton(), this.props.navigation.navigate('LogIn')
            }
          },
          {
            text: 'Cancel',
            onPress: () => this.action.animateButton(),
            style: 'cancel',
          }
        ],
        { cancelable: false },
      );
    } else {
      this.setState({
        actions: [
          {
            text: 'Comentar',
            icon: require('../../../assets/chat.png'),
            name: 'add_comment',
            position: 1
          },
          {
            text: 'Editar Comentarios',
            icon: require('../../../assets/chat.png'),
            name: 'edit_comment',
            position: 2
          }
        ]
      });
    }
  }

  _onInputComment = event => {
    this.setState({
      commentText: event.nativeEvent.text
    });
  };

  _publishComment = async (comment) => {
    if (this.state.imageSource !== null) {
      this.setState({
        isUploading: true
      })
      const urlImage = await uploadImageAsync(this.state.imageSource.uri);
      const emotion = await getEmotions(urlImage);
      const idUser = await getSessionId();
      try {
        await fetch(`https://hsservice.azurewebsites.net/api/v1/?route=createComment&urlImage=${urlImage}&id=${idUser}&comment=${comment}&emotionImage=${emotion}`)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson != '') {
              this.setState({
                isUploading: true,
                isLogin: false
              });
            }
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Por favor debe seleccionar o tomar una foto!!");
    }

  }

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
                  title={`Comment ${item.idComment}`} key={index}
                  image={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hotelsmartservice-46fc6.appspot.com/o/images%2F' + item.urlPhoto.substr(item.urlPhoto.indexOf('images/') + 7) }}>
                  <Text style={styles.comment}>{item.comment}</Text>
                  <Text>{item.emotion}</Text>
                </Card>
              )}
              numColumns={1}
            />
          </ScrollView>
          <FloatingAction
            ref={ref => {
              this.action = ref;
            }}
            showBackground={false}
            iconWidth={10}
            iconHeight={10}
            actions={this.state.actions}
            onOpen={this._isLogin}
            onPressItem={name => { this._commentOptions(name) }}
          />
          {this.state.isLogin ? (
            <View style={styles.newComment}>
              <Spinner
                visible={this.state.isUploading}
                textContent={'Loading...'}
              />
              <Card containerStyle={styles.cardNewComment}
                title={'Agregar Comentario Nuevo'} key={1502}
                imageStyle={styles.newImage}
                image={this.state.imageSource === null ? { uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png' } :
                  { uri: this.state.imageSource.uri }}>
                <View style={styles.flowRight}>
                  <Icon
                    size={35}
                    name='photo-library'
                    onPress={this._selectPhotoGallery.bind(this)}
                    iconStyle={{ marginLeft: '25%', marginRight: '25%' }} />
                  <Icon
                    size={35}
                    name='camera-alt'
                    onPress={this._takePhotoCam.bind(this)}
                    iconStyle={{ marginLeft: '25%', marginRight: '25%' }} />
                </View>
                <Divider style={{ backgroundColor: 'blue', marginBottom: 2 }} />
                <TextInput style={styles.inputComment} placeholder='Agrege un comentario'
                  onChange={this._onInputComment} value={this.state.commentText} />
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
                    title='Aceptar'
                    onPress={() => { this._publishComment(this.state.commentText) }} />
                </View>
              </Card>
            </View>
          ) : null}
        </View>
      );
    }
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
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
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
    height: 50,
    resizeMode: 'contain',
    width: 50,
  },
  flowRight: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 5
  },
  newComment: {
    backgroundColor: 'white',
    height: '100%', 
    justifyContent: 'center',
    width: '100%'
  },
  cardNewComment: {
    backgroundColor: '#edfbfc',
    borderRadius: 2,
    borderWidth: 0,
    padding: 0
  },
  newImage: {
    aspectRatio: 1, 
    justifyContent: 'center',
    height: '60%', 
    width: '100%'
  },
});
