import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
// import App from 'next/app';
// import Head from 'next/head';
import React from 'react';
import theme from '../theme';
import '../styles/css/main.css';
// import '../styles/css/cms.css';
import '../styles/sass/main.scss';
import { ContextProvider } from '@context/Context';
import auth from '@utils/auth';
import Login from './login';
import '../../styles/main.css';
import { useState , useEffect } from "react";
import 'grapesjs/dist/css/grapes.min.css';
import "../styles/sass/main.scss"
// import "../styles/sass/cms.scss"
const App = ({ Component, pageProps ,router }) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])
  if(!isMounted) {
    return null;
  }

  return (
    <ContextProvider>
        {router.pathname.startsWith("/admin")?
          auth.loggedIn()
            ? 
              <Component {...pageProps}/>
            :
              <Login />
            // :
            // router.pathname.startsWith("/cms")?
            //   <ThemeProvider theme={theme}>
            //     <CssBaseline />
            //     <Component {...pageProps} />
            //   </ThemeProvider>
            :
              <Component {...pageProps}/>
        }
    </ContextProvider>
  );
}

export default App;
