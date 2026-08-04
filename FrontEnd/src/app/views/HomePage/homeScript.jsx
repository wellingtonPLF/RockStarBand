import { useEffect } from 'react';
import HomeView from './homeView'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import eventService from "@services/eventService"
import { TicketUser } from "@models/ticketUser"
import { sleep } from '../../shared/utils/general.utils';

const HomeScript = () => {
    const emailEnabled = false;
    const today = new Date();
    const [scrollPosition, setScrollPosition] = useState(0)
    const [chosed, setChosed] = useState(1)

    const bandName = '74°Doses';
    const noneImg = './imgs/simple_white.png';

    const albums = [
        { id: 1, name: "Meu Lamento", img: "./imgs/image.png"},
        { id: 2, name: "Perceptível", img: "./imgs/my_room.png"},
        { id: 3, name: "Persona", img: "./imgs/smile.png"},
        { id: 4, name: "Incômodo", img: "./imgs/cry.png"}
    ];

    const group = [
        {
            id: 1, 
            // name: "JIMMY IVAN", 
            name: "S0NN0", 
            position: "VOCAL", 
            img: "https://yt3.googleusercontent.com/eAokfPhsVZpBHBr-gzaHB70gCJg0nxbS2suXDPqSQb3QQ6qHHikdzyMJclOVdmA_rTPGBjmahQ=s160-c-k-c0x00ffffff-no-rj"
        },
        {
            id: 2, 
            // name: "LEANDRO MENEZES", 
            name: "___________", 
            position: "GUITAR", 
            img: undefined, 
        },
        {
            id: 3, 
            // name: "MYA VOSKOV", 
            name: "___________", 
            position: "BASS", 
            img: undefined
        },
        {
            id: 4, 
            // name: "ALEX MAJOR", 
            name: "___________", 
            position: "DRUMS", 
            img: undefined
        }
    ]

    const [events, setEvents] = useState([]);
    const [done, setDone] = useState(false);
    const userRx = useSelector(state => state.usuarioRedux)

    const handleEvents = () => {
        eventService.listAll().then( 
            it=> {
                setEvents(it.data)
            }
        ).catch(() => {
            console.log("Server in maintenance...")
        })
    }

    const handleBuyTicket = (value, index, ticketType) => {
        setDone(undefined);
        const ticketUser = new TicketUser(value);
        eventService.insert(ticketUser).then(
            async (_) => {
                setDone(true);
                await sleep(1);
                setDone(false);
            }
        ).catch((e) => {
            setDone(false);
            if (userRx.isLoggedIn) {
                events[index][ticketType] = undefined;            
            }
            else {
                console.log("user is not logged in...")
            }
        });
    }

    const handleSetChosed = (value) => {
        let result = chosed + value;
        if (result == 4) {
            result = 3
        } else if (result == 0) {
            result = 1
        }
        setChosed(result)
    }

    const handleScrollPosition = (value) => {
        setScrollPosition(value)
    }

    useEffect(() => {
        handleEvents()
        window.addEventListener('scroll', function() {
            handleScrollPosition(window.scrollY);
        });
    }, [])

    const pictures = [
        "", 
        "", 
        "",
        "", 
        "", 
        "",
        ""
    ]

    return (
        <>
            <HomeView music={albums} members={group} isLogged={userRx.isLoggedIn} emailStatus={emailEnabled} done={done} today={today} bandName={bandName}
            tours={events} media={pictures} scrollPosition={scrollPosition} handleBuyTicket={handleBuyTicket} noneImg={noneImg}
            chosed={chosed} handleSetChosed={handleSetChosed}/>
        </>
    );
};

export default HomeScript;
