import styles from "./loadingStyle.module.css"

const LoadingView = (props) => {
  return (
      <>
          <div id={styles.loadingPage}>
              <div id={styles.loading}></div>              
              <div className={styles.elemento}>{props.counting}</div>
          </div>
      </>
  );
};

export default LoadingView;
