import getUser from '@/utils/getUser';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Redirecting...',
};

export default async function Users() {
    const user = await getUser();

    if (user) redirect(`/users/${user.name}`);
    else redirect('/signin');
}