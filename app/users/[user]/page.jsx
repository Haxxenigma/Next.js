import prisma from '@/configs/prisma';
import getUser from '@/utils/getUser';
import Profile from '@/components/Profile/profile';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    return {
        title: `${params.user} | Profile`,
        description: `${params.user} | Profile page`,
    };
}

export default async function User({ params }) {
    const user = await prisma.user.findUnique({
        where: {
            name: params.user,
        },
        include: {
            articles: true,
        },
    });

    if (!user) return notFound();

    const viewer = await getUser();

    return (
        <Profile user={user} viewer={viewer} />
    );
}