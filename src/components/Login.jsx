import { Component } from 'react';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';

class Login extends Component {
    handleSuccessfulLogin = () => {
        if (this.props.onLogin) {
          this.props.onLogin(); // Set isAuthenticated to true in parent component
        }
        this.props.history.push('/'); // Redirect to main app
      };
    
      render() {
        return <LoginButton onClick={this.handleSuccessfulLogin} />;
      }
    }
    
    Login.propTypes = {
      onLogin: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
    };
    
export default Login;

