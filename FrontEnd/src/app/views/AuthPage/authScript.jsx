import { useEffect, useState } from 'react';
import AuthView from './authView'
import authService from '@services/authService';

const AuthScript = () => {

    const [isLogged, setIsLogged] = useState(true)

    const handleIsLogged = (value) => {
        setIsLogged(value)
    }

    return (
        <>
            <AuthView isLogged={isLogged} setLogged={handleIsLogged}/>
        </>
    );
};

export default AuthScript;
