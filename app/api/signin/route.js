import jwt from 'jsonwebtoken';
import prisma from '@/configs/prisma';
import { validateFields } from '@/utils/validators';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt';

export async function POST(req) {
    const data = await req.json();

    const res = await validateFields(data);
    if (res) return res;

    const user = await prisma.user.findUnique({
        where: {
            name: data.name,
        },
        select: {
            id: true,
            password: true,
        },
    });

    if (user && await compare(data.password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: '7d' });
        cookies().set('auth', token, { path: '/', });
        return Response.json({ message: 'Authentication was successful' });
    }

    const statusText = 'Incorrect login or password';
    return Response.json({ error: statusText }, { status: 401, statusText });
}