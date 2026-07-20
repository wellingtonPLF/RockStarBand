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

    const bandName = '74Doses';

    const albums = [
        { id: 1, name: "Album 1°", img: "./imgs/image.png"},
        { id: 2, name: "********", img: "./imgs/mao.png"},
        { id: 3, name: "********", img: "./imgs/tree.png"},
        { id: 4, name: "********", img: "./imgs/crab.png"}
    ]

    const group = [
        {
            id: 1, 
            // name: "JIMMY IVAN", 
            name: "SONNO", 
            position: "VOCAL", 
            img: "https://yt3.googleusercontent.com/-vD-XiiMPRgYJx6YXHB4K6_X02SuncyqTFUbAPNVcz5SflA9mh3X26xc7QoLz_Zogq5PVv5J0g=s160-c-k-c0x00ffffff-no-rj"
        },
        {
            id: 2, 
            // name: "LEANDRO MENEZES", 
            name: "___________", 
            position: "GUITAR", 
            img: undefined
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
            tours={events} media={pictures} scrollPosition={scrollPosition} handleBuyTicket={handleBuyTicket}
            chosed={chosed} handleSetChosed={handleSetChosed}/>
        </>
    );
};

export default HomeScript;
