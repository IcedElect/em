import { GuardFunction } from 'react-router-guards';
import { getIsLoggedIn } from '../../../utils';

const requireResult = async (to, from, next) => {
  if (to.meta.auth) {
    if (getIsLoggedIn()) {
      next();
    }
    next.redirect('/register');
  } else {
    next();
  }
};

export default requireResult;