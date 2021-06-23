import auth_cookie from '@utils/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    auth_cookie.destroyToken();
    router.push('/');
  }, []);

  return <></>
};

export default Logout;
