const User = require('./userModel');

module.exports = {

  findUserByEmail: function(email) {
    return User.findOne({ email })
      .select()
      .exec();
  },

  createUser(user) {
    const { email, firstName, lastName, password } = user;
    return this.findUserByEmail(email)
      .then(user => {
        if (user) {
          //user already exist
          throw new Error('user already exist');
        }
        const newUser = new User({
          email, password, firstName, lastName
        });
        return newUser.save();
      });
  },

  getUserApplications(userId) {
    return User.findOne({
        _id: userId
      })
      .select('applications')
      .exec();
  }

};