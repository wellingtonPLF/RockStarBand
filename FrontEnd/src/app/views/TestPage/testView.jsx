import styles from "./testStyle.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const TestView = (props) => {

  return (
      <>
          <div className="bg-[#0A0A0A] h-[100vh]">
            <div style={{color: "white"}} className="getBack">
              <Link to="/"><FontAwesomeIcon icon={faAngleLeft} /></Link>
            </div>
            <div className="flex justify-center items-center flex-col h-[90vh]">
              <div className="text-[50px] font-rock text-white">Access Hostname</div>
              <div className="ml-10 mt-10">
                <input className="rounded-md w-[30vw]" value={props.hostname}  onChange={props.setHostname} placeholder="https://example.com/"></input>
                <button onClick={props.apply} className="pl-5 pr-5 pt-2 pb-2 rounded-md active:bg-white bg-red-500 ml-3 text-white font-bold font-alkatra active:text-black">start</button>
              </div>
            </div>
          </div>
      </>
  );
};

export default TestView;
