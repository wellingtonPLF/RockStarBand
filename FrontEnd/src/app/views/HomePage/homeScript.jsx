import { useEffect } from 'react';
import HomeView from './homeView'
import { useState } from 'react';

const HomeScript = () => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const albums = [
        { id: 1, name: "Album 1°", img: "https://images.unsplash.com/photo-1603652339750-18328e625af7?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { id: 2, name: "Album 2°", img: "https://images.unsplash.com/photo-1500099817043-86d46000d58f?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { id: 3, name: "Album 3°", img: "https://images.unsplash.com/photo-1520262494112-9fe481d36ec3?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        { id: 4, name: "Album 4°", img: "https://images.unsplash.com/photo-1439902315629-cd882022cea0?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
    ]

    const group = [
        {id: 1, name: "JIMMY IVAN", position: "VOCAL", img: "https://images.unsplash.com/photo-1563302000-a1a1268259f6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGZvdG8lMjBkZSUyMHBlcmZpbCUyMHByZXRvJTIwZSUyMGJyYW5jb3xlbnwwfHwwfHx8Mg%3D%3D"},
        {id: 2, name: "LEANDRO MENEZES", position: "BASS", img: "https://images.unsplash.com/photo-1598198414976-ddb788ec80c1?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGZvdG8lMjBkZSUyMHBlcmZpbCUyMHByZXRvJTIwZSUyMGJyYW5jb3xlbnwwfHwwfHx8Mg%3D%3D"},
        {id: 3, name: "MYA VOSKOV", position: "GUITAR", img: "https://images.unsplash.com/photo-1656275925082-a1222ab189c7?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZvdG8lMjBkZSUyMHBlcmZpbCUyMHByZXRvJTIwZSUyMGJyYW5jb3xlbnwwfHwwfHx8Mg%3D%3D"},
        {id: 4, name: "ALEX MAJOR", position: "DRUMS", img: "https://images.unsplash.com/photo-1614807547811-4174d3582092?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxmb3RvJTIwZGUlMjBwZXJmaWwlMjBwcmV0byUyMGUlMjBicmFuY298ZW58MHx8MHx8fDI%3D"}
    ]

    const [events, setEvents] = useState();

    const handleEvents = () => {
        fetch("/tours.json").then(res => res.json()).then(value => {
            return value
        }).then(
            it => {
                setEvents(it)
            }
        )        
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
        "https://images.unsplash.com/photo-1681855178578-4535aba9b305?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        "https://images.unsplash.com/46/dpzDUkJrTHb71Yla1EzF_IMG_4098.jpg?auto=format&fit=crop&q=80&w=2048&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        "https://images.unsplash.com/photo-1490915829216-3f2347b1e830?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1690053953030-378c09a069bf?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        "https://images.unsplash.com/photo-1681572128373-d6b3d036cd40?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        "https://images.unsplash.com/photo-1569529787187-de9dc5347a91?auto=format&fit=crop&q=80&w=1972&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1468392788711-903a924761a6?auto=format&fit=crop&q=80&w=2087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]

    return (
        <>
            <HomeView music={albums} members={group} 
            tours={events} media={pictures} scrollPosition={scrollPosition}/>
        </>
    );
};

export default HomeScript;
