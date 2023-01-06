import './Signup.css';
import {useNavigate} from 'react-router';

function Signup() {
  const navigate = useNavigate();
  function handleSignup(e) {
    e.preventDefault();
    const form = e.target;
    const user = {
      username: form[0].value,
      email: form[1].value,
      password: form[2].value,
    }
    
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    });
    fetch("/isUserAuth", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res =>res.json())
    .then(data => data.isLoggedIn ? navigate("/login"):null);
    
    }
  

  return (
      
      <div className="login-signup" id="signup">
        <h1>Sign Up</h1>
        <form onSubmit={event => handleSignup(event)}>
            
          <label htmlFor="username"><b>Username</b></label>
          <input type="text" placeholder="Enter username" name="username" required/>
          <br/>
          <label htmlFor="email"><b>Email</b></label>
          <input type="email" placeholder="Enter Email" name="email" required/>
          <br/>
          <label htmlFor="psw"><b>Password</b></label>
          <input type="password" placeholder="Enter Password" name="psw" required/>
          <br/>
          <input type="submit" value="Submit" className="submit-btn"/>
              
        </form>
    </div>
  );
}

export default Signup;
