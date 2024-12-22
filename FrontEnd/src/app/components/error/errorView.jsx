import styles from "./errorStyle.module.css"

const ErrorView = () => {
  return (
      <>
          <div id={styles.errorPage}>
            <div>
                <div>Servidor em manutenção, </div>
                <div> voltaremos em breve...</div>
            </div>
          </div>
      </>
  );
};

export default ErrorView;
