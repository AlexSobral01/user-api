const Knex = require('../database/connection');
const User = require('./User');

class PasswordToken {
  async create(email) {
    const user = await User.findByEmail(email);
    if (user != undefined) {
      try {
        const token = Date.now();
        await Knex.insert({
          user_id: user.id,
          used: 0,
          token: token
        }).table('passwordtokens');  
        return {status: true, token: token}   
      } catch (error) {
        console.log(error);
        return {status: false, err: error}
      }
    } else {
      return {status: false, err: "email não existe no banco de dados"}
    }
  }
}

module.exports = new PasswordToken;