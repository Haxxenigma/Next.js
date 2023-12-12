import Link from 'next/link';
import axios from '@/configs/axios';
import { useRouter } from 'next/navigation';

export default function DropwdownLink({ path, value }) {
    const router = useRouter();

    const signOut = async (e) => {
        e.preventDefault();
        await axios.delete('/users/cookies');
        router.push('/');
        router.refresh();
    };

    return (
        <Link href={path} onClick={(e) => path === '/signout' && signOut(e)}>
            {value}
        </Link>
    );
}