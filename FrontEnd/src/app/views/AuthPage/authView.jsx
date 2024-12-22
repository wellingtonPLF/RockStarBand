import styles from "./authStyle.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle, faWindows, faXTwitter} from "@fortawesome/free-brands-svg-icons";
import SignUpScript from "../../components/authentication/signUp/signUpScript";
import SignInScript from "../../components/authentication/signIn/signInScript";

const AuthView = (props) => {

  return (
      <>
          <div id={styles.authPage}>
            <div>
              { props.getStatus ? <SignInScript setAuthentication={props.setAuthentication}/> : <SignUpScript setAuthentication={props.setAuthentication}/> }
            </div>
            <div id={styles.oAuth}>
              <div>
                <button>
                  <FontAwesomeIcon icon={faGoogle} />
                  Continue with Google
                </button>
                <button>
                  <FontAwesomeIcon icon={faWindows} />
                  Continue with Miscrosoft
                </button>
                <button>
                  <FontAwesomeIcon icon={faApple} />
                  Continue with Apple
                </button>
                <button disabled>
                  <FontAwesomeIcon icon={faXTwitter} />
                  Continue with Twitter
                </button>
              </div>
            </div>
          </div>
      </>
  );
};

export default AuthView;
