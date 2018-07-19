import { User } from '../models';
import generateToken from '../helpers/generateToken';
import filterUser from '../helpers/filterUser';
import bcrypt from 'bcrypt';

export default {
  createUser(req, res) {
    const { username, password } = req.body;

    User.create({
      username,
      password
    }).then((newUser) => {
      const user = filterUser(newUser);
      return res.status(200).send({
        token: generateToken(user),
        data: user,
      })
    }).catch(() => {
      return res.status(401).send({
        message: 'Signup not successful'
      })
    })
  },
  loginUser(req, res) {
    const { username, password } = req.body;

    User.findOne({
      username,
    }).then((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if(!isPasswordCorrect) {
        return res.status(401).send({
          message: 'username or password not correct, try again',
        });
      };

      const filteredUser = filterUser(user);
        return res.status(200).send({
          token: generateToken(filteredUser),
          data: filteredUser,
          message: 'Login successful'
        });
    })
  }
}