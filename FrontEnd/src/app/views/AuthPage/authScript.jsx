import { useState } from 'react';
import AuthView from './authView'

const AuthScript = () => {

    const [authentication, setAuthentication] = useState(true)

    const handleAuthentication = (value) => {
        setAuthentication(value)
    }

    return (
        <>
            <AuthView getStatus={authentication} setAuthentication={handleAuthentication}/>
        </>
    );
};

export default AuthScript;
