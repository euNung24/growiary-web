'use client';
// import { useEffect } from 'react';
const CookieTest = () => {
  const send = () => {
    fetch(`https://asia-northeast3-growiary-v2.cloudfunctions.net/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        origin: 'https://localhost:3000',
      },
      credentials: 'include',
    });
    // .then(res => res.json())
    // .then(data => console.log(data));
  };

  // useEffect(() => {
  //   const code = new URL(document.location.href).searchParams.get('code');
  //   if (code) {
  //     fetch(`https://localhost:3001/api/google?code=${code}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json; charset=utf-8',
  //       },
  //       credentials: 'include',
  //     })
  //       .then(res => {
  //         return res.json();
  //       })
  //       .then(res => {
  //         console.log(res);
  //       });
  //   }
  // }, []);
  return (
    <>
      <div onClick={send}>click</div>
    </>
  );
};

export default CookieTest;
