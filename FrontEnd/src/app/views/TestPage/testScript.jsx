import { useEffect, useState } from 'react';
import TestView from './testView'
import { useNavigate } from 'react-router-dom';
import { LocalStorageUtil } from '@utils/local-storage'

const TestScript = () => {

    const localStorage = new LocalStorageUtil();
    const [hostname, setHostname] = useState('');
    const navigate = useNavigate();

    const handleSetHostname = (event) => {
        const { value } = event.target;
        setHostname(value);
    }

    const handleApply = () => {
        if (hostname) {
            if (hostname != '' && hostname.includes('http://')) {
                localStorage.setToken('backendHostname', hostname.slice(0, hostname.length - 1))
                navigate('/');
            }
        }
    }

    return (
        <>
            <TestView apply={handleApply} hostname={hostname} setHostname={handleSetHostname}/>
        </>
    );
};

export default TestScript;
