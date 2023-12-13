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
    });

    if (!user) return notFound();

    const viewer = await getUser();

    const articles = await prisma.article.findMany({
        where: {
            authorName: params.user,
        },
        include: {
            author: {
                select: {
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <Profile user={user} viewer={viewer} articles={articles} />
    );
}