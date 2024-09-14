import styles from "./authStyle.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle, faMicrosoft, faWindows, faXTwitter} from "@fortawesome/free-brands-svg-icons";

const AuthView = (props) => {

  return (
      <>
          <div id={styles.authPage}>
            <div>
              <div>
                <div id={styles.topAuth}>
                  <h1>Welcome to SuperVisionary</h1>
                  <div>Please enter your authentication</div>
                </div>
                <div id={styles.auth}>
                  <div>
                    <label>username</label>
                    <input />
                  </div>
                  <div>
                    <label>password</label>
                    <input />
                  </div>
                </div>
                <div id={styles.bottomAuth}>
                  <div>
                    <input type="checkbox"></input>
                    <label>Remember</label>
                  </div>
                  <div>Forgot Password</div>
                </div>
                <button id={styles.signIn}>Sing In</button>

                <div id={styles.signUp}>New to SuperVisionary? <a>Create an account</a></div>
              </div>
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
