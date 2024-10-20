import { useEffect, useState } from 'react';
import SignUpView from './signUpView'
import authService from '@services/authService';
import { roleEnum as RoleEnum } from '../../../shared/enums/role.enum';

const SignUpScript = (props) => {
    const [auth, setAuth] = useState({
        username: "",
        email: "",
        password: "",
        bornDate: "",
        phone: "",
        confirm_password: "",
        roles: RoleEnum.ROLE_USER
    });

    const signUp = () => {
        authService.authInsert(auth).then(
            it => {
                props.setLogged(true)
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
            <SignUpView auth={auth} handleAuth={handleAuth} authenticate={signUp}/>
        </>
    );
};

export default SignUpScript;
