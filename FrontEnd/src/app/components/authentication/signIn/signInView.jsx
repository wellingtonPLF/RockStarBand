import styles from "./signInStyle.module.css"
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const SignInView = (props) => {
  return (
      <>
          <div>
            <div style={{color: "black"}} className="getBack">
              <Link to="/"><FontAwesomeIcon icon={faAngleLeft} /></Link>
            </div>
            <form onSubmit={props.authenticate} autoComplete={props.autoComplete}>
              <div id={styles.topAuth}>
                <h1>Welcome to SuperVisionary</h1>
                <div>Please enter your authentication</div>
              </div>
              <div className="emailType" id={styles.auth}>
                <div className={props.hasError.email ? "inputError" : ""}>
                  <label>Email</label>
                  <input type="email" value={props.auth.email} name="email" placeholder="example@email.com" onChange={props.handleAuth} required/>
                </div>
                <div className={props.hasError.password ? "inputError" : ""}>
                  <label>Password</label>
                  <input type="password" value={props.auth.password} name="password" onChange={props.handleAuth} required/>
                </div>
              </div>
              <div id={styles.bottomAuth}>
                <div>
                  <input type="checkbox" onChange={props.handleCheckboxChange} checked={props.checkBox}></input>
                  <label>Remember</label>
                </div>
                <div>
                {/* Forgot Password  */}
                </div>
              </div>
              <button id={styles.signIn} type="submit">Sing In</button>

              <div id={styles.signUp}>New to SuperVisionary? <a onClick={() => props.setAuthentication(false)}>Create an account</a></div>
            </form>
          </div>
      </>
  );
};

export default SignInView;
