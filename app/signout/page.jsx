'use client';
import axios from '@/configs/axios';
import Loading from '../loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOut() {
    const router = useRouter();

    async function signOut() {
        await axios.delete('/users/cookies');
    }

    useEffect(() => {
        signOut();
        router.push('/');
        router.refresh();
    }, []);

    return <Loading />;
}