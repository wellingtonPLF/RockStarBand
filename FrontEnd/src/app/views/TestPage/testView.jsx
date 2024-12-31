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
              <div className="pl-10 pr-10 text-[50px] font-rock text-white text-center">Access Hostname</div>
              <div className="sm:ml-10 mt-10 flex flex-col sm:flex-row">
                <input className="rounded-md min-w-[200px] w-[70vw] sm:w-[350px] sm:mr-3 mb-4 sm:mb-0" value={props.hostname}  onChange={props.setHostname} placeholder="*********"></input>
                <a href="/" onClick={props.apply} className="text-center cursor-pointer pl-5 pr-5 pt-2 pb-2 rounded-md active:bg-white bg-red-500 text-white font-bold font-alkatra active:text-black">apply</a>
              </div>
            </div>
          </div>
      </>
  );
};

export default TestView;
