import jwt from 'jsonwebtoken';
import prisma from '@/configs/prisma';
import { cookies } from 'next/headers';

export default async function getUser() {
    const cookie = cookies().get('auth');

    if (!cookie) return null;

    const decoded = jwt.verify(cookie.value, process.env.JWT_KEY);

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: decoded.id,
        },
    });

    const { password, ...userData } = user;
    return userData;
}