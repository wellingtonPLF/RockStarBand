import { useEffect, useState } from 'react';
import UserView from './userView'
import userService from '@services/userService';

const UserScript = () => {

    const [ userState, setUserState ] = useState({});
    const [ arrayTickets, setArrayTickets ] = useState([]);

    const handleUserState = (user) => {
        setUserState(user)
    }

    const handleArrayTickets = (tickets) => {
        setArrayTickets(tickets)
    }

    useEffect(() => {
        const user = {
        name: "My Name",
        status: true,
        location: "Brazil",
        link: "myNameIs"
        }
        const ticket = {
        local:"Rua Major Alicard",
        type:"Premium",
        date_buy:"20/03/2025",
        date_event:"30/03/2025",
        value_per_ticket:"R$100.00",
        qnt:"10"
        }

        userService.listAll().then(
        it => {}
        )

        const tickets = [ ticket, ticket, ticket, ticket, ticket]

        handleUserState(user);
        handleArrayTickets(tickets);
    }, [])

    return (
        <>
            <UserView user={userState} tickets={arrayTickets}/>
        </>
    );
};

export default UserScript;
