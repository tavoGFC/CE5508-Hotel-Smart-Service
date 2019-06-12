const {
  Aborter,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  SharedKeyCredential,
  StorageURL,
  uploadStreamToBlockBlob,
  uploadFileToBlockBlob,
} = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

const ONE_MINUTE = 60 * 1000;
var BASE_NAME = 0;

const azureStorageConfig = {
  accountName: 'storagecehss',
  accountKey: 'YjRaw0zv8uUoCKOJnfyp98imgAGpyytw06QX52avcbjfXdXzZyKWSTrw1JVufvxCXQGsv3g0dS8tx3oEV26skg',
  blobURL: 'https://storagecehss.blob.core.windows.net/images/',
  containerName: 'images'
};

const credentials = new SharedKeyCredential(azureStorageConfig.accountName, azureStorageConfig.accountKey);
const pipeline = StorageURL.newPipeline(credentials);
const serviceURL = new ServiceURL(`https://${azureStorageConfig.accountName}.blob.core.windows.net`, pipeline);
const containerURL = ContainerURL.fromServiceURL(serviceURL, azureStorageConfig.containerName);
const aborter = Aborter.timeout(30 * ONE_MINUTE);

async function uploadStream(data) {
  let buff = new Buffer(data, 'base64');
  const fileName = 'image_' + BASE_NAME + '.jpg';
  BASE_NAME += 1;
  try {
    fs.writeFileSync(fileName, buff);
    //console.log(`created file ${fileName}`)
  } catch (err) {
    console.error(err)
  }
  const filePath = path.resolve(`./${fileName}`);
  const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);

  await uploadFileToBlockBlob(aborter, filePath, blockBlobURL);

  try {
    fs.unlinkSync(filePath)
    //console.log(`removed file ${fileName}`)
  } catch (err) {
    console.error(err)
  }

  return 'https://storagecehss.blob.core.windows.net/images/' + fileName
}

async function showBlobNames() {

  let response;
  let marker;
  var array = [];
  do {
    response = await containerURL.listBlobFlatSegment(aborter);
    marker = response.marker;
    for (let blob of response.segment.blobItems) {
      array.push(blob.name)
    }
  } while (marker);
  return array;
}
 
module.exports = { uploadStream, showBlobNames };
