const vision = require('@google-cloud/vision');

async function getEmotions(urlImage) {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'hotelsmartservice-204da97d1580.json'   //Nombre del JSON que contieene los credenciales
  });

  const request = { image: { source: { imageUri: urlImage } } };

  const results = await client.faceDetection(request).then(response => {
    const labels = response[0].faceAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label));
    return labels;
  })
    .catch(err => {
      console.error(err);
    });

  return results;
}

module.exports = getEmotions;

