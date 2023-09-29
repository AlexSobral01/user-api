const User = require('../models/User');

class UserController {
  async index (req, res) {
    const users = await User.findAll();
    res.json(users)
  };

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
}

module.exports = new UserController();