import { useEffect, useState } from 'react';
import TestView from './testView'
import { useNavigate } from 'react-router-dom';
import { LocalStorageUtil } from '@utils/local-storage'
import { protocol } from '@services/_axiosConfig';

const TestScript = () => {

    const localStorage = new LocalStorageUtil();
    const [hostname, setHostname] = useState('');

    const handleSetHostname = (event) => {
        const { value } = event.target;
        setHostname(value);
    }

    const handleApply = () => {
        if (hostname) {
            if (hostname != '' && hostname.includes(protocol)) {
                const lastValue = hostname.charAt(hostname.length - 1)
                if (lastValue == "/") {
                    localStorage.setToken('backendHostname', hostname.slice(0, hostname.length - 1))
                }
                localStorage.setToken('backendHostname', hostname)
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
