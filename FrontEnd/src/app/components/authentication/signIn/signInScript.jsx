import { useEffect, useState } from 'react';
import SignInView from './signInView'
import authService from '@services/authService';
import { useNavigate } from 'react-router-dom';

const SignInScript = (props) => {
    const [auth, setAuth] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const authenticate = () => {
        authService.authentication(auth).then(
            it => {
                navigate('/');
            }
        ).catch((e) => {
            console.log("No connection to the server...")
        })
    }

    const handleAuth = (event) => {
        const { name, value } = event.target;
        setAuth((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <>
            <SignInView auth={auth} handleAuth={handleAuth} authenticate={authenticate} setLogged={props.setLogged}/>
        </>
    );
};

export default SignInScript;
