import './About.css';
import {AuthContext} from '../auth/authContext.js'

export default function About () {
  const auth = useContext(AuthContext);
  useEffect(() => {
    fetch("/isUserAuth", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res =>res.json())
      .then(data => data.isLoggedIn ?  auth.login() : auth.logout());
  });
return (
<div className = "about">
     
  <img src="images/header-abandon.jpeg" className="about-img" alt = "about-img" width="100%"/>
    <div className = "about-text">

     <h1 className="about-title">CAN WE COME OVER</h1>
     <h2 className = "about-sectitle">Help Us, Help Them</h2>
     <p>
      Please let us know which animal you are protecting or which abandoned animal you found.
      The Tails has responded to animals in need through the generous support of individuals, businesses, and foundations. We provide shelter, food, medical treatment, love and care to every animal that is brought to our facility. Our mission is to promote the humane treatment of animals through care, education, and advocacy.</p>
    </div>
</div>);
}
