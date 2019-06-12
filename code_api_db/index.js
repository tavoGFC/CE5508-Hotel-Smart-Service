const db = require('./src/models/model');
const { uploadStream, showBlobNames } = require('./src/azure_files');
const getEmotionImage = require('./src/azure_face');

const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port=process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/users", async (req, res) => {
  let data = await db.models.user.findAll()
  res.status(200).send(data);
});
app.get("/api/v1/blobname", async (req, res) => {
  let data = await showBlobNames()
  res.status(200).send(data);
});
app.get("/api/v1/test", function (req, res) {
  res.status(200).send({"message":"test server request"});
});



app.listen(port);
console.log('Server Listening at port'+port);


/*
const server = hapi.server({
  port: 4000
});

const init = async () => {
  try {
    server.route({
      method: 'GET',
      path: '/api/v1/users',
      handler: function(request, reply){
        return db.models.user.findAll();
      }
    });
    
    server.route({
      method: 'GET',
      path: '/api/v1/blobname',
      handler: function(request, reply){
        return showBlobNames();
      }
    });

    server.route({
      method: 'GET',
      path: '/api/v1/test',
      handler: function(request, reply){
        return {"message":"test server request"};
      }
    })

    await server.start();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
*/
