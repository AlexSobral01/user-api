const Knex = require('../database/connection');
const bcrypt = require('bcrypt');
const PasswordToken = require('./PasswordToken');

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

  async findById(id) {
    try {
      const result = await Knex.select(['id','name','email','role']).where({id: id}).table('users');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }

    } catch (err) {
      console.log(err);
      return[];
    }
  }

  async findByEmail(email) {
    try {
      const result = await Knex.select(['id','name','password','email','role']).where({email: email}).table('users');

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }

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

  async update(id, email, name, role) {
    const user = await this.findById(id);

    if (user != undefined) {
      const editUser = {};

      if (email != undefined) {
        if(email != user.email) {
          const result = await this.findEmail(email);
          if (!result) {
            editUser.email = email;
          } else {
            return {status: false, err: "E-mail já cadastrado"}
          }
        }
      }

      if (name != undefined) {
        editUser.name = name;
      }

      if (role != undefined) {
        editUser.role = role;
      }

      try {
        await Knex.update(editUser).where({id: id}).table("users");
        return {status: true}
      } catch (error) {
        return {status: false, error}
      }

    } else {
      return {status: false, err: "O usuário não existe!"}
    }
  }

  async delete(id) {
    const user = await this.findById(id);

    if (user != undefined) {
      try {
        await Knex.delete().where({id: id}).table("users"); 
        return {status: true};
      } catch (error) {
        return {status: false, err: error}
      }
    } else {
      return {status: false, err: "usuario não existe, portanto não pode ser deletado"}
    }
  }
  
  async changePassword(newPassword,id,token) {
    const hash = await bcrypt.hash(newPassword, 10);    
    await Knex.update({password: hash}).where({id: id}).table('users');
    await PasswordToken.setUsed(token);
  }
}

module.exports = new User;