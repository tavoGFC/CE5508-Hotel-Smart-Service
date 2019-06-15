import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Avatar, Icon, SocialIcon, Divider } from 'react-native-elements';

import { strings } from '../../components/translator/context';

export default class Contact extends React.Component {
  static navigationOptions = {
    title: strings('contact.title')
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}> {strings('contact.titleLocation')} </Text>
          <Text style={styles.textInfo}>
            {strings('contact.address')}
            </Text>
          <View style={styles.flowRight}>
            <Icon
              raised
              name='google-maps'
              type='material-community'
              size={24}
              onPress={() => Linking.openURL('https://maps.google.com/maps?ll=9.12442,-83.69793&z=7&t=m&hl=es&gl=IN&mapclient=embed&daddr=Cristal%20Ballena%207%20km%20al%20Sur%20de%20Uvita%2C%20Costa%20Ballena%2C%20Puntarenas%2C%20COSTA%20RICA%20Puntarenas%20Province%2060504%2C%20Costa%20Rica@9.124419699999999,-83.69793')} />
            <Avatar
              rounded
              size='medium'
              activeOpacity={0.7}
              source={{
                uri:
                  'https://img.icons8.com/color/48/000000/waze.png'
              }}
              onPress={() => Linking.openURL('https://www.waze.com/ul?ll=9.12441970%2C-83.69793000&navigate=yes&zoom=16')} />
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}> {strings('contact.titleContacts')} </Text>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={styles.textInfo}>Tel: (506) 2786-5354</Text>
            <Icon
              raised
              name='call'
              type='material'
              color='#f50'
              onPress={() => Linking.openURL('tel:2786-5354')} />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={styles.textInfo}>Fax: (506) 2786-5355</Text>
            <Icon
              raised
              name='call'
              type='material'
              color='#f50'
              onPress={() => Linking.openURL('tel:2786-5355')} />
          </View>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Icon
              raised
              name='skype'
              type='entypo'
              color='#4abedb'
              onPress={() => Linking.openURL('skype:-cristal-ballena-?char')} />
              <Icon
              raised
              name='email-plus-outline'
              type='material-community'
              color='#db0234'
              onPress={() => Linking.openURL('mailto:info@cristal-ballena.com')} />
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}> {strings('contact.titleSocial')} </Text>
          <View style={styles.flowRight}>
            <SocialIcon
              style
              onPress={() => Linking.openURL('https://twitter.com/cristalballena/')}
              type='twitter'
            />
            <SocialIcon
              onPress={() => Linking.openURL('https://www.facebook.com/CristalBallena/')}
              type='facebook'
            />
            <SocialIcon
              onPress={() => Linking.openURL('https://www.instagram.com/cristalballena/')}
              type='instagram'
            />
            <SocialIcon
              onPress={() => Linking.openURL('https://www.pinterest.com/cristalballena/')}
              type='pinterest'
            />
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%'
  },
  flowRight: {
    marginTop: '3%',
    alignContent: 'center',
    flexDirection: 'row'
  },
  divider: {
    backgroundColor: 'blue',
    margin: '3%'
  },
  textInfo: {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16,
    margin: '5%',
    textAlign: 'justify'
  },
  textTitle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  }
});
