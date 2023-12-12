import prisma from '@/configs/prisma';
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

    if (!user) notFound();

    return (
        <Profile user={user} articles={articles} />
    );
}