import styles from "./authStyle.module.css"

const AuthView = (props) => {

  return (
      <>
          <div id={styles.authPage}>
            <div>
              <label>username</label>
              <input />
            </div>
            <div>
              <label>password</label>
              <input />
            </div>
          </div>
      </>
  );
};

export default AuthView;
