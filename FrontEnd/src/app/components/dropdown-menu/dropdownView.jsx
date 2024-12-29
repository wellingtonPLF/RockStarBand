import "./styles.css";
import styles from "@views/HomePage/homeStyle.module.css"
import { Link as GO } from 'react-scroll';

export const DropDownView = () => {
  
    return (
        <>
            <div id="dropdown">
                <div className="custom-select">
                    <div className="selected-option">
                        Menu
                    </div>
                    <ul className="options">
                        <GO to="home" smooth={true} duration={100}>Home</GO>
                        <GO to={`${styles.music}`} smooth={true} duration={100}>Music</GO>
                        <GO to={`${styles.members}`} smooth={true} duration={100}>Members</GO>
                        <GO to={`${styles.events}`} smooth={true} duration={100}>Events</GO>
                        <GO to={`${styles.media}`} smooth={true} duration={100}>Media</GO>
                        <GO to="contact" smooth={true} duration={100}>Contact</GO>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default DropDownView;
