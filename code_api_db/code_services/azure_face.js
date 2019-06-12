const fetch = require('node-fetch');

async function getEmotionImage(image) {
  const raw = {
    'url': image
  }
  return fetch('https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion&recognitionModel=recognition_01', {
    method: 'POST',
    body: JSON.stringify(raw),
    headers: {
      'Ocp-Apim-Subscription-Key': 'c4065f27910e40a08d7f3717e06d136c',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      const stringJSON = JSON.stringify(responseJson).slice(1, -1);
      const parseResponse = JSON.parse(stringJSON);
      const emotions = parseResponse.faceAttributes.emotion;
      return getEmotion(emotions);
    }).catch(error => console.error(error));
}

function getEmotion(emotionsArray) {
  const maxValue = Math.max.apply(null, Object.values(emotionsArray))
  const emotion = Object.keys(emotionsArray)[Object.values(emotionsArray).indexOf(maxValue)]
  return emotion;
}



module.exports = getEmotionImage;
