import './Navbar.css';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../auth/authContext.js'
export default function Navbar () {
  
  const auth = useContext(AuthContext);
  
  function handleLogout() {
    localStorage.removeItem("token");
    auth.logout();
  }
  return (
    <div className = "top-menu">
      <img src = "images/logo.jpg" alt = "logo" width="150"/>
      <div className="widget-container">
        <nav migration_allowed="1" migrated="0" role="navigation" className="nav-menu">
          <ul className="menu-ul">
            <li className = "menu-item">
              <Link to = "/about" className ="item_button">ABOUT </Link>
            </li>
            <li className = "menu-item">
              <Link to = "/adopt" className ="item_button">ADOPT</Link>
            </li>
            
            {auth.isLoggedIn && (
              <li className = "menu-item">
                <Link to ="/animalregister" id="animalRegBtn" >Animal Register</Link>
              </li>
              )}
              
            {auth.isLoggedIn && (
              <li className = "menu-item">
                <Link to="/" onClick={() => handleLogout()} id="logoutBtn">Logout</Link>
              </li>
            )}
            
            {!auth.isLoggedIn && (
              <li className = "menu-item-login">
                <Link to = "/signup" id="signUpBtn">Sign Up</Link>
              </li>
            )}
            {!auth.isLoggedIn && (
            
              <li className = "menu-item-login">
                <Link to = "/login" id="loginBtn">Login</Link>
              </li>
            )}
            <li className = "menu-contact">
              <a href = "#contact" id ="item_contact">CONTACT</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
