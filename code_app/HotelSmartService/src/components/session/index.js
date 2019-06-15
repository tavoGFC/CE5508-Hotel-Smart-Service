import { AsyncStorage } from 'react-native';

export async function clearSession() {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log(error)
  }
};

export async function getSessionId() {
  try {
    const value = await AsyncStorage.getItem('sessionId')
    return value.toString();
  } catch (error) {
    console.log(error)
  }
};

export async function isLogin() {
  try {
    const value = await AsyncStorage.getItem('sessionId')
    //console.log(`get sessionid ${value}`);
    if (value == null){
      return false;
    }
    return true
  } catch (error) {
    console.log(error)
  }
};

export async function storeSession(id) {
  try {
    await AsyncStorage.setItem('sessionId', id.toString())
    //console.log(`save sessionid ${id}`);
  } catch (error) {
    console.log(error)
  }
};

