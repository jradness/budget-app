import React from 'react';
import Link from 'next/link';

const Register = () => {
  return (
      <div>
        <h2>Register</h2>
        <Link href="/account/login">Already have an account? Login here</Link>
      </div>
  );
};

export default Register;
