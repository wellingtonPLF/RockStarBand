import styles from "./userStyle.module.css"

const UserView = (props) => {

  return (
      <>
          <div id={styles.userPage}>
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

export default UserView;
