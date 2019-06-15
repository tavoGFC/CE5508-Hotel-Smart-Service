import React from 'react';
import { ScrollView, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, Divider, Tile, Icon, ListItem } from 'react-native-elements';
import { strings } from '../../components/translator/context';

export default class Home extends React.Component {
  static navigationOptions = {
    title: strings('weather.title')
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
    return fetch('https://i004gec4z3.execute-api.us-east-2.amazonaws.com/prod/weather?lang=' + strings('weather.language'))
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson != '') {
          this.setState({
            weatherday: responseJson
          })
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
      leftAvatar={{ source: { uri: item.icon } }}
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
