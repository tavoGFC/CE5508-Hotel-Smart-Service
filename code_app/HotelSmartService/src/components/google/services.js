import firebase from 'firebase';
import uuidv4 from 'uuid/v4';

const firebaseConfig = {
  apiKey: 'AIzaSyAMOJc9QlT0I8A04wlC2j-zdn7hZPbWM_I',
  authDomain: 'hotelsmartservice-46fc6.firebaseapp.com',
  databaseURL: 'https://hotelsmartservice-46fc6.firebaseio.com',
  projectId: 'hotelsmartservice-46fc6',
  storageBucket: 'hotelsmartservice-46fc6.appspot.com',
  messagingSenderId: '612554079856',
  appId: '1:612554079856:web:e0e256e2d9f84700'
};

firebase.initializeApp(firebaseConfig);


/**
 * Code from https://github.com/expo/firebase-storage-upload-example
 * @param {data image} uri 
 */
async function uploadImageAsync(uri) {
  const name = uuidv4();
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
    .child(name);
  const snapshot = await ref.put(blob);
  blob.close();

  return 'https://firebasestorage.googleapis.com/v0/b/hotelsmartservice-46fc6.appspot.com/o/images%2F' + name + '?alt=media';
}

async function getEmotions(image) {
  let body = JSON.stringify({
    requests: [
      {
        features: [
          { type: 'LABEL_DETECTION', maxResults: 50 },
          { type: 'IMAGE_PROPERTIES', maxResults: 50 },
          { type: 'FACE_DETECTION', maxResults: 50 },
          { type: 'SAFE_SEARCH_DETECTION', maxResults: 50 }
        ],
        image: {
          source: {
            imageUri: image
          }
        }
      }
    ]
  });

  return await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA-20pl0iT3LRiiKIojHeJzw2xEXqAYCQI',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: body
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson != '') {
        const stringJSON = JSON.stringify(responseJson.responses).slice(1, -1);
        const parseResponse = JSON.parse(stringJSON);
        if (parseResponse.faceAnnotations != null) {
          const emotions = JSON.parse(JSON.stringify(parseResponse.faceAnnotations).slice(1, -1));
          const emotion = Object.keys(emotions)[Object.values(emotions).indexOf('LIKELY')] || Object.keys(emotions)[Object.values(emotions).indexOf('VERY_LIKELY')]
          if (emotion == null) {
            return 'withoutExpresion';
          }

          /*
          console.log(`Joy: ${emotions.joyLikelihood}`);
          console.log(`Anger: ${emotions.angerLikelihood}`);
          console.log(`Sorrow: ${emotions.sorrowLikelihood}`);
          console.log(`Surpise: ${emotions.surpriseLikelihood}`);
          */
          return emotion;
        }
      } else {
        return 'withoutExpresion';
      }
    })
    .catch(error => {
      console.error(error);
    });
}


module.exports = { uploadImageAsync, getEmotions };
