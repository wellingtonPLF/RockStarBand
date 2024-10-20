import styles from "./userStyle.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const UserView = (props) => {

  return (
      <>
          <div id={styles.getBack}>
            <a href="/"><FontAwesomeIcon icon={faAngleLeft} /></a>
          </div>
          <div id={styles.container}>
            <div>
              <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2ZsNTI3NzE0MzAzOS1pbWFnZS1rcWJzcDFldC5qcGc.jpg" />
            </div>
            <div id={styles.userPage}>
              <div>
                <div id={styles.info}>
                  <div id={styles.userImg}>
                    <div id={styles.borderImg}></div>
                  </div>
                  <div>{props.user.name}</div>
                </div>
                <div id={styles.options}>
                  <ul>
                    <li>Status: <span style={{color: props.user.status ? "limegreen" : "red"}}>{props.user.status ? "Online" : "Offline"}</span></li>
                    <li>Location: {props.user.location}</li>
                    <li>@{props.user.link}</li>
                  </ul>
                </div>
                <div id={styles.tickets}>
                  {props.tickets.map((ticket, index) => (
                    <div key={index}>
                      <div>Local: {ticket.local}</div>
                      <div>Tipo: {ticket.type}</div>
                      <div>Data da compra: {ticket.date_buy}</div>
                      <div>Data do evento: {ticket.date_event}</div>
                      <div>Valor/ticket: {ticket.value_per_ticket}</div>
                      <div>Quantidade: {ticket.qnt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </>
  );
};

export default UserView;
