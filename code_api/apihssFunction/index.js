const db = require('../code_services/model');
const uploadImageAsync = require('../code_services/storageImages');
const getWeather = require('../code_services/weather');
const getEmotions = require('../code_services/vision');


module.exports = async function (context, req) {

  if (req.query.route == 'test') {
    context.res = {
      status: 200,
      body: { "message": "Hello World!!" }
    }
  }
  //service firebase upload image
  else if (req.query.route == 'uploadImage') {
    const data = await uploadImageAsync(req.query.image);
    context.res = {
      status: 200,
      body: data
    }
  }
  //serive weather from apixu
  else if (req.query.route == 'weather') {
    const data = await getWeather(req.query.language);
    context.log(language);
    context.res = {
      status: 200,
      body: {"test":"weather"}
    }
  }
  //service get label image from Google Cloud Vision
  else if (req.query.route == 'vision') {
    const data = await getEmotions(req.query.urlImage);
    context.log(data);
    context.res = {
      status: 200,
      body: data
    }
  }

  //CRUD users
  else if (req.query.route == 'users') {
    const data = await db.models.user.findAll();
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'createUser') {
    const data = await db.models.user.create({
      firstName: req.query.firstName, lastName: req.query.lastName,
      email: req.query.email, password: req.query.password, userName: req.query.userName
    });
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'deleteUser') {
    const data = await db.models.user.destroy({ where: { idUser: req.query.id } });
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'updateUser') {
    const data = await db.models.user.update({
      firstName: req.query.firstName, lastName: req.query.lastName,
      email: req.query.email, password: req.query.password, userName: req.query.userName
    },
      {
        where: { idUser: req.query.id }
      })
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'readUser') {
    const data = await db.models.user.findAll({ where: { idUser: req.query.id } })
    context.res = {
      status: 200,
      body: data
    }
  }
  //CRUD Comment
  else if (req.query.route == 'comments') {
    const data = await db.models.comment.findAll();
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'createComment') {
    const data = await db.models.comment.create({
      idUser: req.query.id, comment: req.query.comment,
      urlPhoto: req.query.urlImage, emotion: emotionImage
    })
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'deleteComment') {
    const data = await db.models.comment.destroy({ where: { idComment: req.query.id } })
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'updateComment') {
    const data = await db.models.comment.update({ comment: req.query.comment, urlPhoto: req.query.urlPhoto, emotion: req.query.emotion },
      {
        where: { idComment: req.query.id }
      })
    context.res = {
      status: 200,
      body: data
    }
  }
  else if (req.query.route == 'readComment') {
    const data = await db.models.comment.findAll({ where: { idComment: req.query.id } })
    context.res = {
      status: 200,
      body: data
    }
  }
  //Management Users
  else if (req.query.route == 'verifyUser') {
    const data = await db.models.user.findAll({
      where: {
        email: req.query.email
      }
    })
    context.res = {
      status: 200,
      body: data
    }
  }
};
