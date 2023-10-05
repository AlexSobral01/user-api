const User = require('../models/User');
const PasswordToken = require('../models/PasswordToken');

class UserController {
  async index (req, res) {
    const users = await User.findAll();
    res.json(users)
  };

  async findUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);

    if(user == undefined) {
      res.status(404);
      res.json({});
    } else {
      res.status(200)
      res.json(user);
    }
  }

  async create(req, res) {
    const {name, email, password} = req.body;

    if (email == undefined) {
      res.status(400);
      res.json({err: "E-mail inválido"});
      return;
    }

    var emailExists = await User.findEmail(email);

    if (emailExists) {
      res.status(406)
      res.json({err: "E-mail já cadastrado!"});
      return;
    }

    await User.new(name, email, password);

    res.status(200);
    res.send('pegando o corpo da requisição!')
  }

  async edit (req, res) {
    const {id, email, name, role} = req.body;
    const result = await User.update(id, email, name, role);

    if (result != undefined) {
      if (result.status) {
        res.send("tudo ok");
      } else {
        res.status(406);
        res.json(result.err)
      }
    } else {
      res.status(406);
      res.send("Ocorreu um erro no servidor!")
    }
  }

  async remove(req, res) {
    const id = req.params.id;
    const result = await User.delete(id);

    if (result.status) {
      res.status(200);
      res.send('tudo ok');
    } else {
      res.status(406);
      res.send(result.err);
    }
  }

  async recoverPassword(req, res) {
    const email = req.body.email;
    const result = await PasswordToken.create(email);

    if (result.status) {
      res.status(200);
      res.send('' + result.token);
    } else {
      res.status(406);
      res.send(result.err);
    }
  }
}

module.exports = new UserController();