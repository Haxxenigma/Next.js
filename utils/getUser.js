import jwt from 'jsonwebtoken';
import prisma from '@/configs/prisma';
import { cookies } from 'next/headers';

export default async function getUser(chat = false, articles = false) {
    const cookie = cookies().get('auth');

    if (!cookie) return null;

    const decoded = jwt.verify(cookie.value, process.env.JWT_KEY);

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: decoded.id,
        },
        include: {
            articles: articles,
            chats: chat && {
                orderBy: {
                    updatedAt: 'desc',
                },
                include: {
                    messages: {
                        take: 1,
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
            },
        },
    });

    const { password, ...userData } = user;
    return userData;
}