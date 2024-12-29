import styles from "./homeStyle.module.css"
import {faFacebook, faXTwitter, faYoutube, faInstagram, faTiktok} from "@fortawesome/free-brands-svg-icons";
import { faUser, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as GO } from 'react-scroll';
import DropDownView from "../../components/dropdown-menu/dropdownView";

const HomeView = (props) => {
  const bgColor = (props.scrollPosition != 0)? "bg-red-500": ""
  const hoverClick = (props.scrollPosition != 0)? "hover:text-bluegray": ""
  const hiddenTicket = "!hidden own:!flex"

  useEffect(() => {
  }, [])

  return (
      <>
          <div id={styles.homePage}>
              <header id="home">
                <div className={bgColor}>
                  <div>
                    {props.isLogged !== undefined ? (
                      <Link to={props.isLogged ? '/profile' : '/authentication'}>
                      <ul style={{display: "flex", marginLeft: "8vw"}} className={hoverClick}>
                        <li href="">< FontAwesomeIcon icon={faUser}/></li>
                        <li href="" style={{ marginLeft: "15px", fontSize: "18px"}}>Account</li>
                      </ul>
                      </Link> 
                    ) : 
                      <Link to="/setHost" className={"flex w-[105px] ml-[8vw]" + ` ${hoverClick}`} >Server Access</Link> 
                    }
                  </div>
                  <nav className="mr-[8vw] md:hidden flex h-full">
                    <DropDownView />
                  </nav>
                  <nav className="md:flex">
                    <ul>
                      <GO to="home" smooth={true} duration={100} className={hoverClick}>Home</GO>
                      <GO to={`${styles.music}`} smooth={true} duration={100} className={hoverClick}>Music</GO>
                      <GO to={`${styles.members}`} smooth={true} duration={100} className={hoverClick}>Members</GO>
                      <GO to={`${styles.events}`} smooth={true} duration={100} className={hoverClick}>Events</GO>
                      <GO to={`${styles.media}`} smooth={true} duration={100} className={hoverClick}>Media</GO>
                      <GO to="contact" smooth={true} duration={100} className={hoverClick}>Contact</GO>
                    </ul>
                  </nav>
                </div>
                <div>
                  <div id={styles.annoucement}>
                    <h1 id={styles.year}>2023</h1>
                    <h3>NEXT SHOW WILL BE ANNOUNCED SOON!</h3>
                    <GO to={`${styles.events}`} smooth={true} duration={100} className={hoverClick}>VIEW DATES</GO>                    
                  </div>
                </div>
              </header>
            <main>
              <section id={styles.music}>
                  <h2>Music</h2>
                  <div>
                    {
                      props.music.map((element, index) => (
                        <div key={element.id}>
                          <div>
                            <img src={element.img} />
                          </div>
                          <div>{element.name}</div>
                          <div>
                            <div>Spotify</div>
                            <div>I &nbsp; Youtube &nbsp; I</div>
                            <div>Deezer</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
              </section>

              <div id={styles.player}></div>

              <section id={styles.members}>
                  <h2>Who We Are</h2>
                  <div>
                    {
                      props.members.map((e) => (
                        <div key={e.id}>
                          <div>
                            <img src={e.img} />
                          </div>
                          <div>{e.name}</div>
                          <div>{e.position}</div>
                        </div>
                      ))
                    }
                  </div>
              </section>
              
              <section id={styles.phase}>
                  <div>
                    <div>
                      "Little things makes you smile.
                      Dance barefoot in the dark.
                      Choose your words before you speak.
                      Can't you see that all you've got is time."
                    </div>
                    <div>KALAO</div>
                  </div>
              </section>

              <section id={styles.events}>
                  <div>
                    <h2 className={`${props.done ? "border-green-500": (props.done == undefined ? "border-yellow-400":"border-red-500")}`}>TOUR DATES</h2>
                  </div>
                  {
                    props.tours != undefined && props.tours.length != 0 ? (
                      <div className="w-fit flex flex-col items-end">
                        <div id="arrows" className="own:hidden flex text-sm mr-[7vw] pt-2 text-white">
                          <button onClick={() => {props.handleSetChosed(-1)}}>
                            <FontAwesomeIcon icon={faChevronLeft}/>
                          </button>
                          <button onClick={() => {props.handleSetChosed(+1)}} className="ml-10">
                            <FontAwesomeIcon icon={faChevronRight}/>
                          </button>
                        </div>
                        <table className="relative">
                          {
                            props.tours.map((data, index) => (
                              <tbody key={index}>
                                
                                {
                                  <>
                                    <tr>
                                        <td>{data.weekday.toUpperCase()}</td>
                                        <th>{data.month.slice(0, 3)} {data.day}</th>
                                    </tr>
                                    <tr>
                                        <td>{data.city.toUpperCase()}, {data.country.toUpperCase()}</td>
                                        <th>{data.location.toUpperCase()}</th>
                                    </tr>
                                    <tr className={props.chosed == 1 ? "":hiddenTicket}>
                                      <td>NORMAL</td>
                                      {!data.normal ? 
                                        <th>SOLD OUT</th>:
                                        <th><button onClick={() => props.handleBuyTicket(data.normal, index, "normal")}>IN STOCK</button></th>
                                      }
                                    </tr>
                                    <tr className={props.chosed == 2 ? "":hiddenTicket}>
                                      <td>FAN CLUB</td>
                                      {!data.fan ? 
                                        <th>SOLD OUT</th>:
                                        <th><button onClick={() => props.handleBuyTicket(data.fan, index, "fan")}>IN STOCK</button></th>
                                      }
                                    </tr>
                                    <tr className={props.chosed == 3 ? "":hiddenTicket}>
                                      <td>VIP TICKETS</td>
                                      {!data.vip ? 
                                        <th>SOLD OUT</th>:
                                        <th><button onClick={() => props.handleBuyTicket(data.vip, index, "vip")}>IN STOCK</button></th>
                                      }
                                    </tr>
                                  </>
                                }
                              </tbody>)
                            )
                          }
                        </table>
                      </div>
                    ) : (<div className={styles.errorEvent}>Status: server unavailable due to ongoing maintenance...</div>)
                  }
              </section>
              <section id={styles.media}>
                  <div>
                      {
                        props.media.map((e, index) => (
                          <div key={index} style={{backgroundImage: `url(${e})`}}></div>
                        ))
                      }
                  </div>
              </section>
            </main>
            <footer id="contact">
              <form action="" method="post">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" autoComplete="off" name="name" required disabled={!props.emailStatus}/>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" autoComplete="off" name="email" required disabled={!props.emailStatus}/>
                    </div>
                    <div>
                      <label htmlFor="tel">Phone</label>
                      <input type="tel" id="tel" autoComplete="off" name="tel" required disabled={!props.emailStatus}/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enterprise">Enterprise</label>
                    <input type="text" id="enterprise" autoComplete="off" name="enterprise" required disabled={!props.emailStatus}/>
                  </div>
                  <div>
                    <label htmlFor="comments">Comments</label>
                    <textarea id="comments" autoComplete="off" name="comments" disabled={!props.emailStatus}></textarea>
                  </div>
                  <input type="submit" value="Submit" disabled={!props.emailStatus}/>
              </form>
              <div>
                <FontAwesomeIcon icon={faTiktok} />
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faXTwitter} />
              </div>
            </footer>
          </div>
      </>
  );
};

export default HomeView;
