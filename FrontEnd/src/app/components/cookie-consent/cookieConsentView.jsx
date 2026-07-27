import styles from "./cookieConsentStyle.module.css"

const CookieConsentView = ({ visible, onAccept, onReject, onClose, onOpenPreferences }) => {
  return (
      <div id={styles.cookieConsent} className={visible ? styles.visible : ""}>
        <p>
          Ao clicar em "Aceitar todos os cookies", concorda com o armazenamento de cookies no seu dispositivo
          para melhorar a navegação no site, analisar a utilização do site e ajudar nas nossas iniciativas de marketing.
        </p>
        <div className={styles.actions}>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenPreferences(); }}>Definições de cookies</a>
          <button onClick={onReject}>Rejeitar Todos</button>
          <button onClick={onAccept} className={styles.primary}>Aceitar todos os cookies</button>
        </div>
        <button className={styles.close} onClick={onClose} aria-label="Fechar">×</button>
      </div>
  );
};

export default CookieConsentView;
