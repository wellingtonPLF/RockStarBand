import { useEffect, useState } from 'react';
import LoadingView from './loadingView'
import { sleep } from '../../shared/utils/general.utils';

const LoadingScript = () => {

    const [counter, setCounter] = useState(3);

    const updateCounter = async () => {
        await sleep(1);
        setCounter(2);
        await sleep(1);
        setCounter(1);
        await sleep(1);
        setCounter(0);
    };

    useEffect(() => {
        updateCounter()
    }, [])

    return (
        <>
            <LoadingView counting={counter}/>
        </>
    );
};

export default LoadingScript;
