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

  async validate(token) {
    try {
      const result = await Knex.select().where({token: token}).table('passwordtokens');
      
      if (result.length > 0) {

        const tk = result[0];

        if (tk.used) {
          return {status: false};
        } else {
          return {status: true, token: tk};
        }

      } else {
        return {status: false};
      }
    } catch (error) {
      console.log(error)
      return {status: false}
    }
  }

  async setUsed(token) {
    await Knex.update({used: 1}).where({token: token}).table('passwordtokens');
  }
}

module.exports = new PasswordToken;