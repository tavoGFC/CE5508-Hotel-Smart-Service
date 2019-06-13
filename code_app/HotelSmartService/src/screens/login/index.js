import React from 'react';
import { ActivityIndicator, TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default class LogIn extends React.Component {
  static navigationOptions = {
    title: 'Iniciar Sesion'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  _logIn = async () => {
    try {
      await fetch(
        `http://192.168.43.84:8000/api/v1/users/findOne?email=${this.state.email}`
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson != '') {
            const parseResponse = JSON.stringify(responseJson);
            if (parseResponse != '') {
              this.setState({
                userPassword: JSON.parse(
                  parseResponse.substring(1, parseResponse.length - 1)
                ).password
              });
            }
          }
        });
      const simpleCrypto = new SimpleCrypto('RNwallyAPP');
      const passwordDecrypt = simpleCrypto.decrypt(this.state.userPassword);
      if (this.state.password === passwordDecrypt) {
        this.props.navigation.goBack();
      } else {
        Alert.alert('Correo o contraseñas son incorrectos, intente de nuevo.');
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  _onSearchEmailUser = event => {
    this.setState({
      email: event.nativeEvent.text
    });
  };

  _onSearchPasswordUser = event => {
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
      Alert.alert(
        'Por favor ingrese un correo y una contraseña ya registrados.'
      );
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
            onChange={this._onSearchEmailUser}
            placeholder='Correo'
            placeholderTextColor='#656565'
            style={styles.textInput}
            underlineColorAndroid={'transparent'}
            value={this.state.email}
          />
          <TextInput
            autoCorrect={false}
            onChange={this._onSearchPasswordUser}
            placeholder='Contraseña'
            placeholderTextColor='#656565'
            secureTextEntry={true}
            style={styles.textInput}
            underlineColorAndroid={'transparent'}
            value={this.state.password}
          />
          <TouchableOpacity onPress={this._submitData}>
            <Text style={styles.button}>INGRESAR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._onSignUpPressed.bind(this)}>
            <Text style={styles.button}>REGISTRARSE</Text>
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
