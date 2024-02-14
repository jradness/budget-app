import React from 'react';
import Link from 'next/link';

const Login = () => {
  return (
      <div>
        <h2>Login</h2>
        <Link href="/account/register">New User? Register here</Link>
      </div>
  );
};

export default Login;
