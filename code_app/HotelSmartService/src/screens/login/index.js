import React from 'react';
import { 
  ActivityIndicator, 
  Alert, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from 'react-native';
import SimpleCrypto from 'simple-crypto-js';

import { storeSession } from '../../components/session';
import { strings } from '../../components/translator/context';

export default class LogIn extends React.Component {
  static navigationOptions = {
    title: strings('login.title')
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      verifyPassword: '',
      idSession: ''
    };
  }

  _logIn = async () => {
    try {
      await fetch(
        `https://hsservice.azurewebsites.net/api/v1/?route=verifyUser&email=${this.state.email}`)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson != '') {
            const parseJson = JSON.parse(JSON.stringify(responseJson).slice(1, -1));
            this.setState({
              verifyPassword: parseJson.password,
              idSession: parseJson.idUser
            })
          }
        });
      const simpleCrypto = new SimpleCrypto('pswceHSS');
      //const passwordDecrypt = simpleCrypto.decrypt(this.state.verifyPassword);
      if (this.state.password === this.state.verifyPassword) {
        storeSession(this.state.idSession);
        this.props.navigation.goBack();
      } else {
        Alert.alert(strings('login.alertLogin'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  _onInputEmailUser = event => {
    this.setState({
      email: event.nativeEvent.text
    });
  };

  _onInputPasswordUser = event => {
    this.setState({
      password: event.nativeEvent.text
    });
  };

  _onSignUpPressed = () => {
    this.props.navigation.navigate('SignUp');
  };

  _submitData = () => {
    if (this.validateData()) {
      this._logIn();
    } else {
      Alert.alert(strings('login.alertData'));
    }
  };

  validateData() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.state.email === '' ||
      (reg.test(this.state.email) === false && this.state.password === '')
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;
    return (
      <View style={styles.containerLogIn}>
        <View style={styles.flowRight}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            onChange={this._onInputEmailUser}
            placeholder={strings('login.placeholderEmail')}
            placeholderTextColor='#656565'
            style={styles.textInput}
            underlineColorAndroid={'transparent'}
            value={this.state.email}
          />
          <TextInput
            autoCorrect={false}
            onChange={this._onInputPasswordUser}
            placeholder={strings('login.placeholderPassword')}
            placeholderTextColor='#656565'
            secureTextEntry={true}
            style={styles.textInput}
            underlineColorAndroid={'transparent'}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this._submitData}>
            <Text style={styles.button}>{strings('login.loginButton')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onSignUpPressed.bind(this)}>
            <Text style={styles.button}>{strings('login.signupButton')}</Text>
          </TouchableOpacity>
        </View>
        {spinner}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerLogIn: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: '10%',
    padding: '2%'
  },
  flowRight: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column'
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
  }
});
