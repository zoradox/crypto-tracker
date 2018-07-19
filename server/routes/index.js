import User from '../controllers/User';

export default (routes) => {
  routes.post('/signup', User.createUser);
  routes.post('/login', User.loginUser);
};
