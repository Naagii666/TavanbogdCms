import '../styles/css/main.css';
import '../styles/sass/main.scss';
import { ContextProvider } from '@context/Context';
import auth from '@utils/auth';
import Login from './login';
import { useState , useEffect } from "react";

const App = ({ Component, pageProps }) => {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if(!isMounted) {
    return null;
  }

  return (
    <ContextProvider>
      {
        auth.loggedIn()
          ? <Component {...pageProps}/>
          : <Login />
      }
    </ContextProvider>
  );
};

export default App;
