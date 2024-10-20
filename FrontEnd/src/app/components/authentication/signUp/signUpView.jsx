import styles from "./signUpStyle.module.css"
import InputMask from 'react-input-mask';

const SignUpView = (props) => {

  return (
      <>
        <div>
            <div style={{padding: "0px 10px"}}>
              <div id={styles.topAuth}>
                <h1>Welcome to SuperVisionary</h1>
                <div>Please enter your authentication</div>
              </div>
              <div id={styles.auth}>
                <div>
                  <label>nickname</label>
                  <input value={props.auth.username} name="username" onChange={props.handleAuth}/>
                </div>
                <div>
                  <label>bornDate</label>
                  <input type="date" value={props.auth.bornDate} name="bornDate" onChange={props.handleAuth}/>
                </div>
                <div>
                  <label>phone</label>
                  <InputMask
                    mask="(99) 9 9999-9999"
                    value={props.auth.phone}
                    onChange={props.handleAuth}
                    name="phone"
                    placeholder="(ZZ) Y XXXX-XXXX">
                    {(inputProps) => <input {...inputProps} type="text" />}
                  </InputMask>
                </div>
                <div>
                  <label>email</label>
                  <input value={props.auth.email} name="email" placeholder="example@email.com" onChange={props.handleAuth}/>
                </div>
                <div>
                  <label>password</label>
                  <input type="password" value={props.auth.password} name="password" onChange={props.handleAuth}/>
                </div>
                <div>
                  <label>confirm password</label>
                  <input type="password" value={props.auth.confirm_password} name="confirm_password" onChange={props.handleAuth}/>
                </div>
              </div>
              <div id={styles.bottomAuth}>
                <div>
                  <input type="checkbox"></input>
                  <label>Remember</label>
                </div>
                <div>Forgot Password</div>
              </div>
              <button id={styles.signIn} onClick={props.authenticate}> Sing Up </button>
            </div>
          </div>
      </>
  );
};

export default SignUpView;
