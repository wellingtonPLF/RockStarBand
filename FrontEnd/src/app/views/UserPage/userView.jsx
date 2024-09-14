import styles from "./userStyle.module.css"

const UserView = (props) => {

  return (
      <>
          <div id={styles.container}>
            <div>
              <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2ZsNTI3NzE0MzAzOS1pbWFnZS1rcWJzcDFldC5qcGc.jpg" />
            </div>
            <div id={styles.userPage}>
              <div>
                <div id={styles.info}>
                  <img src="imgs/profile.png" width={230}/>
                  <div>My Name</div>
                </div>
                <div id={styles.options}>
                  <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                  </ul>
                </div>
                <div id={styles.tickets}>
                  <div>Ticket 1</div>
                  <div>Ticket 2</div>
                  <div>Ticket 3</div>
                </div>
              </div>
            </div>
          </div>
      </>
  );
};

export default UserView;
