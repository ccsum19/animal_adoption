import './Login.css';
import {useContext} from 'react';
import {useNavigate} from 'react-router';
import {AuthContext} from '../auth/authContext.js'
function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth);
    async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value,
    }
    
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res =>res.json())
    .then(data => {localStorage.setItem("token", data.token)
    });
    
    await fetch("/isUserAuth", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res =>res.json())
      .then(data => {
        if(data.isLoggedIn) {
          auth.login();
          navigate("/about");
        } else {
          auth.logout();
        }
      });
      
  }
    
    
  return (
      <div className="login-signup" id="login">
        <h1>Login</h1>
        <form onSubmit={event => handleLogin(event)}>
              
          <label htmlFor="username"><b>Username</b></label>
          <input type="text" placeholder="Enter username" name="username" required/>
          <br/>
          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required/>
          <br/>
          <input type="submit" value="Submit"/>
             
        </form>
    </div>
  );
}

export default Login;
  

  
