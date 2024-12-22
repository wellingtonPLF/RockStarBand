import { useEffect, useState } from 'react';
import SignUpView from './signUpView'
import authService from '@services/authService';
import { useDispatch } from 'react-redux';
import { roleEnum as RoleEnum } from '@enums/role.enum';
import { setUser } from '@redux/actions.ts';
import { useNavigate } from 'react-router-dom';
import { User } from '@models/user.js';

const SignUpScript = (props) => {
    const [hasError, setHasError] = useState({ email: false, password: false });
    const [autoComplete, setAutoComplete] = useState("new-password");
    const [choice,setChoice] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [auth, setAuth] = useState({
        username: "",
        email: "",
        password: "",
        user: new User(),
        confirm_password: ""
    });

    const signUp = (e) => {
        e.preventDefault();
        if (auth.confirm_password != auth.password) {
            handleHasError("password");
        }
        else {
            authService.authInsert(auth).then(
                it => {
                    const user = { nickName: auth.username, isLoggedIn: true };
                    dispatch(setUser({ ...user }));
                    setAutoComplete("new-password")
                    navigate('/');
                }
            ).catch((e) => {
                handleHasError(e.errorType)
                setAutoComplete("off")
                console.log(e.error)
            })
        }
    }

    const handleHasError = (errorType) => {
        if(errorType == "email"){
            setHasError({ email: true, password: false})
        }
        else if(errorType == "password"){
            setHasError({ email: false, password: true})
        }
    }    

    const handleChoice = () => {
        if (auth.user.bornDate != undefined && auth.user.phone != undefined) {
            if (auth.username.length > 2 && auth.user.bornDate != '' && auth.user.phone.length > 15) {
                setChoice(!choice)
            }
        }
    }

    const handleAuth = (event) => {
        const { name, value } = event.target;
        const condition = name == "phone" || name == "bornDate";

        setAuth((prevState) => {
            if (condition) {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        [name]: value
                    },
                };
            } else {
                return {
                    ...prevState,
                    [name]: value,
                };
            }
        });
    }

    return (
        <>
            <SignUpView auth={auth} handleAuth={handleAuth} authenticate={signUp} hasError={hasError} autoComplete={autoComplete}
            setAuthentication={props.setAuthentication} choice={choice} setChoice={handleChoice}/>
        </>
    );
};

export default SignUpScript;
