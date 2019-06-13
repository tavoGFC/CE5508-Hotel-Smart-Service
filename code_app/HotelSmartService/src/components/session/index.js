import { AsyncStorage } from 'react-native';

export async function storeSession(id) {
  try {
    await AsyncStorage.setItem('sessionId', id)
  } catch (error) {
    console.log(error)
  }
};

export async function isLogin() {
  try {
    const value = await AsyncStorage.getItem('sessionId')
    return (value !== null)
  } catch (error) {
    console.log(error)
  }
};

export async function clearSession() {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log(error)
  }
};
