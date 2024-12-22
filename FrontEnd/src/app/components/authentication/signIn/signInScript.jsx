import { useState } from 'react';
import SignInView from './signInView'
import authService from '@services/authService';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@redux/actions.ts';

const SignInScript = (props) => {
    const userRx = useSelector(state => state.usuarioRedux)
    const [autoComplete, setAutoComplete] = useState("new-password");
    const [checked, setChecked] = useState(true)
    const [hasError, setHasError] = useState({ email: false, password: false });
    const dispatch = useDispatch();
    const [auth, setAuth] = useState({
        email: "",
        password: ""
    });

    const handleCheckboxChange = () => {
        // setChecked(!checked);
        setChecked(checked);
    }

    const navigate = useNavigate();

    const authenticate = (e) => {
        e.preventDefault();
        authService.authentication(auth).then(
            it => {
                const user = { ... userRx, nickName: it.username, isLoggedIn: true };
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

    const handleHasError = (errorType) => {
        if(errorType == "email"){
            setHasError({email: true, password: false})
        }
        else if(errorType == "password"){
            setHasError({email: false, password: true})
        }
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
            <SignInView 
                auth={auth} 
                handleAuth={handleAuth} 
                authenticate={authenticate} 
                handleCheckboxChange={handleCheckboxChange}
                setAuthentication={props.setAuthentication}
                checkBox={checked}
                hasError={hasError}
                autoComplete={autoComplete}
            />
        </>
    );
};

export default SignInScript;
