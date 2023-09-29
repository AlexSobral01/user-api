const Knex = require('../database/connection');
const bcrypt = require('bcrypt');

class User {

  async findAll() {
    try {
      const result = await Knex.select(['id','name','email','role']).table('users');
      return result;
    } catch (err) {
      console.log(err);
      return[];
    }
  }

  async new(name, email, password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      await Knex.insert({ email, password: hash, name, role: 0 }).table('users');
    } catch (err) {
      console.log(err);
    }
  }

  async findEmail(email) {
    try {
      var result = await Knex.select("*").from('users').where({email: email});

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }

    } catch(err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new User;