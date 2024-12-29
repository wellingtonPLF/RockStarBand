import styles from "./signUpStyle.module.css"
import InputMask from 'react-input-mask';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const SignUpView = (props) => {

  return (
      <>
        <div>
            <div style={{color: "black"}} className="getBack">
              <div onClick={props.setAuthentication}><FontAwesomeIcon icon={faAngleLeft} /></div>
            </div>
            <form onSubmit={props.authenticate} style={{padding: "0px 10px"}} autoComplete={props.autoComplete}>
              <div id={styles.topAuth}>
                <h1>Welcome to SuperVisionary</h1>
                <div>Please enter your authentication</div>
              </div>
              <div id={styles.auth}>
                { props.choice ? 
                  <div>
                    <div>
                      <label>nickname</label>
                      <input value={props.auth.username} name="username" onChange={props.handleAuth}/>
                    </div>
                    <div>
                      <label>bornDate</label>
                      <input className="w-full" type="date" value={props.auth.user.bornDate || ""}  name="bornDate" onChange={props.handleAuth}/>
                    </div>
                    <div>
                      <label>phone</label>
                      <InputMask
                        mask="(99) 9 9999-9999"
                        value={props.auth.user.phone|| ""}
                        onChange={props.handleAuth}
                        name="phone"
                        placeholder="(ZZ) Y XXXX-XXXX">
                        {(inputProps) => <input {...inputProps} type="text" />}
                      </InputMask>
                    </div>
                  </div>
                  :
                  <div className="emailType">
                    <div className={props.hasError.email ? "inputError" : ""}>
                      <label>email</label>
                      <input type="email" value={props.auth.email} name="email" placeholder="example@email.com" onChange={props.handleAuth} required/>
                    </div>
                    <div>
                      <label>password</label>
                      <input type="password" value={props.auth.password} name="password" onChange={props.handleAuth} required/>
                    </div>
                    <div className={props.hasError.password ? "inputError" : ""}>
                      <label>confirm password</label>
                      <input type="password" value={props.auth.confirm_password} name="confirm_password" onChange={props.handleAuth} required/>
                    </div>
                  </div>
                }
              </div>
              { props.choice ? 
                <button id={styles.signIn} onClick={props.setChoice}> Próximo </button>
              : <button id={styles.signIn} type="submit"> Sing Up </button>
              }
            </form>
          </div>
      </>
  );
};

export default SignUpView;
