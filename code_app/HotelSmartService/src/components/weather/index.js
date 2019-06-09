import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, Divider, Tile, Icon, ListItem } from 'react-native-elements';


export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Clima'
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      weather: [],
      weatherday: []
    };
  }

  componentWillMount() {
    return fetch('https://cehsm.azure-api.net/wheater/forecast?key=085c2f5b86be410f9679629b93c2f07b')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != '') {
          const parseResponse = JSON.stringify(responseJson);
          if (parseResponse != '') {
            this.setState({
              weather: JSON.parse(parseResponse)
            });
            setTimeout(() => this.setState({
              weatherday: this.state.weather.forecast.forecastday.map(function (item, index) {
                return { key: index, date: item.date, temp: item.day.avgtemp_c, condition: item.day.condition.text, icon: 'http://' + item.day.condition.icon };  
              })
            }), 2000);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
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
      title={item.date}
      subtitle={
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>{item.condition}</Text>
          <Text style={styles.ratingText}>{item.temp}°</Text>
        </View>
      }
      leftAvatar={{ source: { uri: item.icon }}}
    />
  )
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.weatherday}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    padding: '2%'
  },
  contentContainer: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  flowRight: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});
