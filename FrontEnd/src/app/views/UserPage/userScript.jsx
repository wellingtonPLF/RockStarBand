import { useEffect, useState } from 'react';
import UserView from './userView'
import eventService from '@services/eventService';
import authService from '@services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '@redux/actions.ts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserScript = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ userState, setUserState ] = useState({});
    const [ arrayTickets, setArrayTickets ] = useState([]);
    const userRx = useSelector(state => state.usuarioRedux)

    const handleUserState = (user) => {
        setUserState(user)
    }

    const handleArrayTickets = (tickets) => {
        setArrayTickets(tickets)
    }

    const logout = () => {
        authService.logOut().then(
            it => {
                const user = { isLoggedIn: false };
                dispatch(setUser({ ...user }));
                navigate('/');
            }
        ).catch((e) => {
            console.log("No connection to the server...")
        })
    }

    useEffect(() => {        
        const user = {
            name: userRx.nickName,
            status: true,
            location: "Brazil",
            link: userRx.nickName
        }

        eventService.getUserEvents().then(
            it => {
                handleArrayTickets(it.data)
            }
        ).catch(() => {})

        handleUserState(user);
    }, [])

    return (
        <>
            <UserView user={userState} tickets={arrayTickets} logout={logout}/>
        </>
    );
};

export default UserScript;
