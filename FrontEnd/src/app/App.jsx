import './App.css'
import './AppRouter.jsx'
import AppRouter from './AppRouter.jsx'
import authService from '@services/authService';
import userService from '@services/userService';
import { setUser } from '@redux/actions.ts';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { sleep } from './shared/utils/general.utils.js';
import LoadingScript from './components/loading/loadingScript.jsx';

function App() {
  const userRx = useSelector(state => state.usuarioRedux)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const timing = 0;

  useEffect(() => {
    authService.isLoggedIn()
      .then((it) => {
        const user = { ...userRx, isLoggedIn: it.isLoggedIn };
        dispatch(setUser({ ...user }));
        if (it.isLoggedIn) {
          userService.getAuthenticatedUser().then(result => {
            const user = { ... result.data, isLoggedIn: it.isLoggedIn };
            dispatch(setUser({ ...user }));
          }).catch(() => {})
        }
      })
      .catch(async (_) => {
        await sleep(timing)
        setLoading(false);
      })
      .finally(async () => {
        await sleep(timing)
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <LoadingScript/>
  }

  return (
    <div id="app">
      <AppRouter />
    </div>
  );
}

export default App;
