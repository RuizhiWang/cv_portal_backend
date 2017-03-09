const userDao = require('./middleware/userDao');

const API_PREFIX = '/api/user';
const addPath = path => `${API_PREFIX}${path}`

const handleResponse = (func, res) => {
  func()
    .then(data => res.send(data))
    .catch(err => {
      console.log(err.stack);
    })
}
const api = app => {


  app.get(
    addPath('/login'),
    (req, res) => {
      // TO BE DONE....
    }
  );

  app.get(
    addPath('/signUp'),
    (req, res) => {
      const { user } = req;
      handleResponse(
        () => userDao.createUser(user),
        res
      );
    }
  );

  app.get(
    addPath('/application'),
    (req, res) => {
      res.send({
        status: 'ok'
      });
    }
  );

  app.get(
    addPath('/application/:userId'),
    (req, res) => {
      const { userId } = req.params;
      handleResponse(
        () => userDao.getUserApplications(userId),
        res
      );
    }
  );

};

module.exports = api;