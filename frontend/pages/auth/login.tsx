import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import './LoginPage.css';
import Button from '../../components/atoms/button/Button';
// import { ReactComponent as TwitterIcon } from '../../static/images/twitter.svg';
import { SessionContext } from '../../context/SessionProvider';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { bearerToken, setBearerToken } = useContext(SessionContext);

  const handleClick = async () => {
    window.open('http://localhost:8080/login', '_self');
  };

  useEffect(() => {
    if (bearerToken !== '') {
      router.push('/');
    }
    if (router.query.accessToken) {
      const uri = window.location.toString();
      if (uri.indexOf('?') > 0) {
        const clean_uri = uri.substring(0, uri.indexOf('?'));
        window.history.replaceState({}, document.title, clean_uri);
      }
      setBearerToken(router.query.accessToken as string);
    }
  }, [router, bearerToken]);

  return (
    <div className='LoginPage'>
      {/* <img src={shiImg} alt={'shi'} /> */}
      <h1>AI Tweets</h1>
      <h3>Explore AI Generated Tweets</h3>
      <p>
        If you want to explore AI generated tweet suggestions created from your
        Twitter bubble, please follow{' '}
        <a href='https://twitter.com/Shi_suggests'>
          https://twitter.com/Shi_suggests
        </a>{' '}
        and log in with your Twitter account.
      </p>
      <Button
        onClick={handleClick}
        text={'Login with GitHub'}
        // Icon={GitHubIcon}
      />
    </div>
  );
};

export default LoginPage;
