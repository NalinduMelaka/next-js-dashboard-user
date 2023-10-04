"use client";
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const SignOut = () => {
    useEffect(() => {
        signOut({
            callbackUrl: process.env.NEXTAUTH_URL,
            redirect: true,
        });
    }, []);

    return null;
};

export default SignOut;
