import React from 'react';
import {
  ActivityIndicator, RefreshControl,
  ScrollView, Image, TouchableOpacity, StyleSheet, Text, View
} from 'react-native';
import { Card, Divider, Button, Icon } from 'react-native-elements';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  DrawerNavigator
} from 'react-navigation';

import GetWeather from '../../components/weather';


export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Hotel Smart Service'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      weather: [],
      weatherday: []
    };
  }

  componentDidMount() {
    return fetch('http://api.apixu.com/v1/forecast.json?key=64700405af534cbe914184115192605&q=9.123185,-83.6931613&days=7')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != '') {
          const parseResponse = JSON.stringify(responseJson);
          
          if (parseResponse != '') {
            this.setState({
              weather: JSON.parse(parseResponse) 
            });
            
            setTimeout(() => this.setState({
              weatherday: this.state.weather.forecast.forecastday.map(function(item, index) {
                return (
                  <Text key={index}>
                    {item.date} y {item.day.avgtemp_c}
                  </Text>
                );
              })
            }), 2000);

          }
        }
      })
      .catch(error => {
        console.error(error);
      });

  }


  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size='large' />
    ) : null;
    return (
      <ScrollView contentContainerStyle={styles.contentContainer} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => this.componentDidMount()}
        />
      }
      >
        <Text> Pantalla principal Hotel Smart Service </Text>
        {this.state.weatherday} 
      </ScrollView>
    );
  }


}
/*
<Card containerStyle={styles.card}
          title='HELLO WORLD'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
            {this.state.weather}
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
        <Card containerStyle={styles.card}
          title='HELLO WORLD1'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
            </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
        <Card containerStyle={styles.card}
          title='HELLO WORLD2'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
            </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
        <Card containerStyle={styles.card}
          title='HELLO WORLD3'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
            </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
        <Card containerStyle={styles.card}
          title='HELLO WORLD4'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
            </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
        <Card containerStyle={styles.card}
          title='HELLO WORLD5'>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component structure than actual design.
            </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>
*/

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
});
