import styles from "./homeStyle.module.css"
import {faFacebook, faXTwitter, faYoutube, faInstagram, faTiktok} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HomeView = (props) => {
  const bgColor = (props.scrollPosition != 0)? "bg-red-500": ""
  const hoverClick = (props.scrollPosition != 0)? "hover:text-bluegray": ""

  return (
      <>
          <div id={styles.homePage}>
            <header id="home">
              <div className={bgColor}>
                {/* <a href="">Super Visionário</a> */}
                <a href=""></a>
                <nav>
                  <ul>
                    <li><a href="#home" className={hoverClick}>Home</a></li>
                    <li><a href={`#${styles.music}`} className={hoverClick}>Music</a></li>
                    <li><a href={`#${styles.members}`} className={hoverClick}>Members</a></li>
                    <li><a href={`#${styles.events}`} className={hoverClick}>Events</a></li>
                    <li><a href={`#${styles.media}`} className={hoverClick}>Media</a></li>
                    <li><a href="#contact" className={hoverClick}>Contact</a></li>
                  </ul>
                </nav>
              </div>
              <div>
                <div id={styles.annoucement}>
                  <h1 id={styles.year}>2023</h1>
                  <h3>NEXT SHOW WILL BE ANNOUNCED SOON</h3>
                  <a href={`#${styles.events}`}>VIEW DATES</a>
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
                  <h2>TOUR DATES</h2>
                  <table>
                      {
                        props.tours != undefined ? (
                          <>
                            {
                              props.tours.map((e, index) => (
                                <tbody key={index}>
                                  {
                                    e.data != undefined ? (
                                      <>
                                        {
                                          e.data.map((el, index) => (
                                            <tr key={index}>
                                                <td>{el.header}</td>
                                                <th>{el.value}</th>
                                            </tr>
                                          ))
                                        }
                                        <tr>
                                          <td>NORMAL</td>
                                          <th>SOLD OUT</th>
                                        </tr>
                                        <tr>
                                          <td>FAN CLUB</td>
                                          <th>SOLD OUT</th>
                                        </tr>
                                        <tr>
                                          <td>VIP TICKETS</td>
                                          <th>SOLD OUT</th>
                                        </tr>
                                      </>
                                    ): (<></>)
                                  }
                                </tbody>))
                            }
                          </>
                        ) : (undefined)
                      }
                  </table>
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
                    <input type="text" id="name" autoComplete="off" name="name" required/>
                  </div>
                  <div>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" autoComplete="off" name="email" required />
                    </div>
                    <div>
                      <label htmlFor="tel">Phone</label>
                      <input type="tel" id="tel" autoComplete="off" name="tel" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="enterprise">Enterprise</label>
                    <input type="text" id="enterprise" autoComplete="off" name="enterprise" required/>
                  </div>
                  <div>
                    <label htmlFor="comments">Comments</label>
                    <textarea id="comments" autoComplete="off" name="comments"></textarea>
                  </div>
                  <input type="submit" value="Submit" />
              </form>
              <div>
                <FontAwesomeIcon icon={faXTwitter} />
                <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faTiktok} />
                <FontAwesomeIcon icon={faFacebook} />
              </div>
            </footer>
          </div>
      </>
  );
};

export default HomeView;
