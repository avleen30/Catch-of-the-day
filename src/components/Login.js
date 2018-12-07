import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav className="login">
    <h2>Login to edit Inventory</h2>
    <button className="github" onClick={() => props.authenticate('Github')}>Log in with Github</button>
    <button className="facebook" onClick={() => props.authenticate('Facebook')}>Log in with Facebook</button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}
export default Login;
