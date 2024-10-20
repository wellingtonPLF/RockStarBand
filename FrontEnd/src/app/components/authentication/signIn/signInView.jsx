import styles from "./signInStyle.module.css"

const SignInView = (props) => {
  return (
      <>
          <div>
              <div id={styles.topAuth}>
                <h1>Welcome to SuperVisionary</h1>
                <div>Please enter your authentication</div>
              </div>
              <div id={styles.auth}>
                <div>
                  <label>username</label>
                  <input value={props.auth.email} name="email" placeholder="example@email.com" onChange={props.handleAuth}/>
                </div>
                <div>
                  <label>password</label>
                  <input type="password" value={props.auth.password} name="password" onChange={props.handleAuth}/>
                </div>
              </div>
              <div id={styles.bottomAuth}>
                <div>
                  <input type="checkbox"></input>
                  <label>Remember</label>
                </div>
                <div>Forgot Password</div>
              </div>
              <button id={styles.signIn} onClick={props.authenticate} >Sing In</button>

              <div id={styles.signUp}>New to SuperVisionary? <a onClick={() => props.setLogged(false)}>Create an account</a></div>
            </div>
      </>
  );
};

export default SignInView;
