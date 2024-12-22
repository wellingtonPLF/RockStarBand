import styles from "./userStyle.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const UserView = (props) => {

  return (
      <>
          <div className="getBack">
            <Link to="/"><FontAwesomeIcon icon={faAngleLeft} /></Link>
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
                  <div style={{height: "24px"}}>{props.user.name}</div>
                </div>
                <div id={styles.options}>
                  <ul>
                    <li>Status: <span style={{color: props.user.status ? "limegreen" : "red"}}>{props.user.status ? "Online" : "Offline"}</span></li>
                    <li>Location: {props.user.location}</li>
                    <li>@{props.user.link}</li>
                    <li id={styles.logout} onClick={props.logout}>Logout</li>
                  </ul>
                </div>
                <div id={styles.tickets} style={{height: props.tickets.length == 0 ? "auto" : "38vh", backgroundColor: props.tickets.length == 0 ? "#111113" : "#212125"}}>
                  {props.tickets.length ==0 ? <div>Nenhum ticket encontrado!</div>: 
                    props.tickets.map((ticket, index) => (
                      <div key={index}>
                        <div>Local: {ticket.local}</div>
                        <div>Tipo: {ticket.type}</div>
                        <div>Data da compra: {ticket.date_buy}</div>
                        <div>Período: {ticket.date_event_initial} - {ticket.date_event}</div>
                        <div>Valor/ticket: {ticket.value_per_ticket}</div>
                        <div>Quantidade: {ticket.qnt}</div>
                      </div>
                    ))
                  }                  
                </div>
              </div>
            </div>
          </div>
      </>
  );
};

export default UserView;
