import firebase from 'firebase';
import uuidv4 from 'uuid/v4';

const firebaseConfig = {
  apiKey: "AIzaSyAMOJc9QlT0I8A04wlC2j-zdn7hZPbWM_I",
  authDomain: "hotelsmartservice-46fc6.firebaseapp.com",
  databaseURL: "https://hotelsmartservice-46fc6.firebaseio.com",
  projectId: "hotelsmartservice-46fc6",
  storageBucket: "hotelsmartservice-46fc6.appspot.com",
  messagingSenderId: "612554079856",
  appId: "1:612554079856:web:e0e256e2d9f84700"
};

firebase.initializeApp(firebaseConfig);


/**
 * Code from https://github.com/expo/firebase-storage-upload-example
 * @param {data image} uri 
 */
async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const ref = firebase
    .storage()
    .ref('images/')
    .child(uuidv4());
  const snapshot = await ref.put(blob);
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

module.exports = uploadImageAsync;
