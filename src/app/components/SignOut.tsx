"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignOut = () => {
    useEffect(() => {
        signOut({
            callbackUrl: 'https://main.d2me89d8lvxbla.amplifyapp.com/',
            redirect: true,
        });
    }, []);

    return null;
};

export default SignOut;
